import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post, Put, Query } from '@nestjs/common';

import { CreateCocktailDto, UpdateCocktailDto } from './cocktails.dto';
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

  @Put('edit')
  async update(@Query('id') id: string, @Body() updateCocktailDto: UpdateCocktailDto) {
    try {
      const updatedCocktail = await this.cocktailsService.findByIdAndUpdate(id, updateCocktailDto);
      if (!updatedCocktail) {
        throw new HttpException('Cocktail not found', HttpStatus.NOT_FOUND);
      }
      return updatedCocktail;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
