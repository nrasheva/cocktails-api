import { Body, Controller, Post } from '@nestjs/common';

import { CreateCocktailDto } from './cocktails.dto';
import { CocktailsService } from './cocktails.service';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  async createCocktail(@Body() body: CreateCocktailDto): Promise<void> {
    return this.cocktailsService.create(body);
  }
}
