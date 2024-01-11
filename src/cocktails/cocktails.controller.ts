import { Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';

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

  @Get('details')
  async getCocktail(@Query('id') id: string) {
    const cocktail = await this.cocktailsService.findById(id);
    if (!cocktail) {
      throw new NotFoundException(`Cocktail with ID ${id} not found`);
    }
    return cocktail;
  }
}
