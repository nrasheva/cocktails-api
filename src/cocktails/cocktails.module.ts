import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';
import { Cocktail, CocktailSchema } from './schemas/cocktail.schema';

@Module({
  controllers: [CocktailsController],
  imports: [MongooseModule.forFeature([{ name: Cocktail.name, schema: CocktailSchema }])],
  providers: [CocktailsService],
})
export class CocktailsModule {}
