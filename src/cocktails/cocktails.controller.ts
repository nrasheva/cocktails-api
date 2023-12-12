import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateCocktailDto } from './cocktails.dto';

import type { Cocktail } from './cocktails.types';

@Controller('cocktails')
export class CocktailsController {
    @Post()
    createCocktail(@Body() body: CreateCocktailDto) {
        console.log(body);
        return '';
    }

    @Get()
    getCocktails(): Cocktail[] {
        const cocktails = [
            { id: 'd38238ec-d26b-4cc0-a3c5-9a00fbc34d58', name: 'A Quiet Cocktail' },
            { id: '907e74b7-8d0b-4259-bbf0-f5974d3554dd', name: 'A Royale with Rum' },
        ];

        return cocktails;
    }
}
