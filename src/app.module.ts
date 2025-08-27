import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CocktailsModule } from './cocktails/cocktails.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CocktailsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/cocktails'),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    FavoritesModule,
    ShoppingListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
