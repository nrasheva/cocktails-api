import { Module } from '@nestjs/common';

import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CocktailsModule } from 'src/cocktails/cocktails.module';
import { UsersModule } from 'src/users/users.module';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [UsersModule, CocktailsModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, AuthenticatedGuard],
})
export class FavoritesModule {}
