import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { COCKTAILS_DATA } from './cocktails.data';
import { CreateCocktailDto } from './cocktails.dto';
import { Cocktail } from './schemas/cocktail.schema';

@Injectable()
export class CocktailsService {
  constructor(@InjectModel(Cocktail.name) private cocktailModel: Model<Cocktail>) {}

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
}
