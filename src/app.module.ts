import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CocktailsModule } from './cocktails/cocktails.module';

@Module({
  imports: [CocktailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
