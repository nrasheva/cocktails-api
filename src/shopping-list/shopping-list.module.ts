import { Module } from '@nestjs/common';

import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CocktailsModule } from 'src/cocktails/cocktails.module';
import { UsersModule } from 'src/users/users.module';

import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListService } from './shopping-list.service';

@Module({
  imports: [UsersModule, CocktailsModule],
  controllers: [ShoppingListController],
  providers: [ShoppingListService, AuthenticatedGuard],
})
export class ShoppingListModule {}
