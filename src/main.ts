import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as nodeCrypto from 'crypto';

import { AppModule } from './app.module';
import { CocktailsService } from './cocktails/cocktails.service';

(global as any).crypto = {
  randomUUID: nodeCrypto.randomUUID ? nodeCrypto.randomUUID.bind(nodeCrypto) : undefined,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const cocktailsService = app.get(CocktailsService);

  await cocktailsService.initializeFromApi();

  await app.listen(3000);
}

bootstrap();
