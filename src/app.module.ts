import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CocktailsModule } from './cocktails/cocktails.module';

@Module({
  imports: [CocktailsModule, MongooseModule.forRoot('mongodb://localhost:27017/cocktails')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
