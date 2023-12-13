import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
}
