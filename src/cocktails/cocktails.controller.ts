import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/constants/roles.decorator';
import { RolesGuard } from 'src/constants/roles.guard';

import { CreateCocktailDto, UpdateCocktailDto } from './cocktails.dto';
import { CocktailsService } from './cocktails.service';

import type { Cocktail } from './cocktails.types';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
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

  @Put()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
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

  @Delete('delete')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async remove(@Query('id') id: string) {
    try {
      const deletedCocktail = await this.cocktailsService.findOneAndDelete(id);
      if (!deletedCocktail) {
        throw new NotFoundException(`Cocktail with ID ${id} not found`);
      }
      return deletedCocktail;
    } catch (error) {
      console.log(error);
    }
  }
}
