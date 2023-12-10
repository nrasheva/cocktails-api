import { Module } from '@nestjs/common';

import { CocktailsController } from './cocktails.controller';

@Module({
  controllers: [CocktailsController],
})
export class CocktailsModule {}
