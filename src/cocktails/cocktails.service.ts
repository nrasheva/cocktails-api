import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

import { COCKTAILS_DATA } from './cocktails.data';
import { CreateCocktailDto } from './cocktails.dto';
import { Cocktail } from './schemas/cocktail.schema';

@Injectable()
export class CocktailsService {
  private readonly logger = new Logger(CocktailsService.name);

  constructor(
    @InjectModel(Cocktail.name) private cocktailModel: Model<Cocktail>,
    private httpService: HttpService,
  ) {}

  async create(createCocktailDto: CreateCocktailDto): Promise<void> {
    const createdCocktail = new this.cocktailModel(createCocktailDto);

    await createdCocktail.save();
  }

  async findAll(): Promise<Cocktail[]> {
    return this.cocktailModel.find().exec();
  }

  async bulkInsert(cocktailsData: CreateCocktailDto[]): Promise<void> {
    await this.cocktailModel.insertMany(cocktailsData);
  }

  async initializeData(): Promise<void> {
    for (const cocktailData of COCKTAILS_DATA) {
      // Check if a cocktail with the same unique identifier already exists
      const existingCocktail = await this.cocktailModel.findOne({ name: cocktailData.name }).exec();

      if (!existingCocktail) {
        const createdCocktail = new this.cocktailModel(cocktailData);
        await createdCocktail.save();
      }
    }
  }

  async findById(id: string): Promise<Cocktail | null> {
    return this.cocktailModel.findById(id).exec();
  }

  async findByIdAndUpdate(id: string, data: any): Promise<any> {
    try {
      const updatedData = await this.cocktailModel.findByIdAndUpdate(id, data, { new: true }).exec();
      if (!updatedData) {
        throw new Error('Cocktail not found');
      }
      return updatedData;
    } catch (error) {
      console.log(error);
    }
  }

  async findOneAndDelete(id: string): Promise<any> {
    try {
      const deletedData = await this.cocktailModel.findOneAndDelete({ _id: id }).exec();
      if (!deletedData) {
        throw new Error('Cocktail not found');
      }
      return deletedData;
    } catch (error) {
      console.log(error);
    }
  }

  // API

  async initializeFromApi(): Promise<void> {
    const count = await this.cocktailModel.countDocuments().exec();
    if (count > 0) {
      return;
    }

    await this.fetchAndSaveAllCocktails();
  }

  // Fetch by name

  async fetchFromApiByName(name: string): Promise<any> {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data.drinks;
  }

  private extractIngredients(cocktail: any): { name: string; measure: string }[] {
    const ingredients: { name: string; measure: string }[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push({
          name: ingredient,
          measure: measure?.trim() ?? '', // remove extra spaces or default to empty string
        });
      }
    }

    return ingredients;
  }

  // Cron job to run daily at midnight

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailySync() {
    this.logger.log('Running daily cocktail sync...');
    await this.fetchAndSaveAllCocktails();
  }

  // Fetch all cocktails

  async fetchAndSaveAllCocktails(): Promise<void> {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const allCocktails: Partial<Cocktail>[] = [];

    for (const letter of alphabet) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
      const response = await firstValueFrom(this.httpService.get(url));
      const cocktails = response.data.drinks;
      if (!cocktails) continue;

      for (const cocktail of cocktails) {
        const cocktailData: Partial<Cocktail> = {
          idDrink: cocktail.idDrink,
          name: cocktail.strDrink,
          category: cocktail.strCategory ?? '',
          alcoholic: cocktail.strAlcoholic ?? '',
          glass: cocktail.strGlass ?? '',
          instructions: cocktail.strInstructions ?? '',
          ingredients: this.extractIngredients(cocktail),
          img: cocktail.strDrinkThumb ?? '',
          thumb: cocktail.strImageSource ?? '',
        };
        allCocktails.push(cocktailData);
      }
    }

    // Fetch all existing cocktails once
    const existing = await this.cocktailModel.find({}, { idDrink: 1, name: 1 }).lean();
    const existingIds = new Set(existing.map((cocktail) => cocktail.idDrink));
    const existingNames = new Set(existing.map((cocktail) => cocktail.name.toLowerCase()));

    // Filter out duplicates by idDrink or name
    const newCocktails = allCocktails.filter(
      (cocktail) =>
        cocktail.idDrink &&
        !existingIds.has(cocktail.idDrink) &&
        !existingNames.has((cocktail.name ?? '').toLowerCase()),
    );

    if (newCocktails.length > 0) {
      await this.cocktailModel.insertMany(newCocktails);
      this.logger.log(`Inserted ${newCocktails.length} new cocktails`);
    } else {
      this.logger.log('No new cocktails to insert');
    }
  }

  // Fetch by ID

  async fetchCocktailById(id: string): Promise<any> {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data?.drinks?.[0] ?? null;
  }
}
