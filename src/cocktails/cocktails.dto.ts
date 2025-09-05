import { Type } from 'class-transformer';
import { IsArray, IsString, IsUrl, ValidateNested } from 'class-validator';

class IngredientDto {
  @IsString()
  name: string;

  @IsString()
  measure: string;
}

export class CreateCocktailDto {
  @IsString()
  idDrink: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  alcoholic: string;

  @IsString()
  glass: string;

  @IsString()
  instructions: string;

  @IsUrl()
  img: string;

  @IsUrl()
  thumb: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  // @IsArray()
  // @IsString({ each: true })
  // recipe: string[];

  // @IsString()
  // @IsAlpha()
  // taste: string;

  // @IsString()
  // time: string;

  // @IsString()
  // @IsAlpha()
  // level: string;
}

export class UpdateCocktailDto {
  @IsString()
  idDrink?: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  alcoholic: string;

  @IsString()
  glass: string;

  @IsString()
  instructions: string;

  @IsUrl()
  img: string;

  @IsUrl()
  thumb: string;

  @IsArray()
  ingredients: string[][];

  // @IsArray()
  // @IsString({ each: true })
  // recipe: string[];

  // @IsString()
  // @IsAlpha()
  // taste: string;

  // @IsString()
  // time: string;

  // @IsString()
  // @IsAlpha()
  // level: string;
}
