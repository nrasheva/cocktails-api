import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/users/users.module';

import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';
import { Cocktail, CocktailSchema } from './schemas/cocktail.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cocktail.name, schema: CocktailSchema }]), UsersModule, HttpModule],
  controllers: [CocktailsController],
  providers: [CocktailsService],
  exports: [MongooseModule.forFeature([{ name: Cocktail.name, schema: CocktailSchema }])],
})
export class CocktailsModule {}
