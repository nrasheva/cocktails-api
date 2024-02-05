import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthGuard } from 'src/auth/auth.guard';
import { UsersModule } from 'src/users/users.module';

import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';
import { Cocktail, CocktailSchema } from './schemas/cocktail.schema';

@Module({
  controllers: [CocktailsController],
  imports: [MongooseModule.forFeature([{ name: Cocktail.name, schema: CocktailSchema }]), UsersModule],
  providers: [CocktailsService, AuthGuard],
})
export class CocktailsModule {}
