import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateCocktailDto } from './cocktails.dto';
import { CocktailsService } from './cocktails.service';

import type { Cocktail } from './cocktails.types';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  async createCocktail(@Body() body: CreateCocktailDto): Promise<void> {
    return this.cocktailsService.create(body);
  }

  @Get()
  async getCocktails(): Promise<Cocktail[]> {
    return this.cocktailsService.findAll();
  }
}
