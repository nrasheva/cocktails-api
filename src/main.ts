import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as nodeCrypto from 'crypto';

import { AppModule } from './app.module';
import { CocktailsService } from './cocktails/cocktails.service';

// Polyfill only if globalThis.crypto is missing
if (!globalThis.crypto) {
  (globalThis as any).crypto = nodeCrypto.webcrypto;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const cocktailsService = app.get(CocktailsService);

  await cocktailsService.initializeFromApi();

  await app.listen(3000);
}

bootstrap();
