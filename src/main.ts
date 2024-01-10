import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CocktailsService } from './cocktails/cocktails.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const cocktailsService = app.get(CocktailsService);

  await cocktailsService.initializeData();

  await app.listen(3000);
}

bootstrap();
