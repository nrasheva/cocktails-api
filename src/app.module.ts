import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CocktailsModule } from './cocktails/cocktails.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CocktailsModule, MongooseModule.forRoot('mongodb://localhost:27017/cocktails'), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
