import { Type } from 'class-transformer';
import { IsAlpha, IsArray, IsString, IsUrl, ValidateNested } from 'class-validator';

class IngredientDto {
  @IsString()
  name: string;

  @IsString()
  quantity: string;
}

export class CreateCocktailDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  img: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @IsArray()
  @IsString({ each: true })
  recipe: string[];

  @IsString()
  @IsAlpha()
  taste: string;

  @IsString()
  time: string;

  @IsString()
  @IsAlpha()
  level: string;
}

export class UpdateCocktailDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  img: string;

  @IsArray()
  ingredients: string[][];

  @IsArray()
  @IsString({ each: true })
  recipe: string[];

  @IsString()
  @IsAlpha()
  taste: string;

  @IsString()
  time: string;

  @IsString()
  @IsAlpha()
  level: string;
}
