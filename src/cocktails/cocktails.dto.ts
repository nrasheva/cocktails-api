import { IsAlpha, IsArray, IsString, IsUrl } from 'class-validator';

export class CreateCocktailDto {
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
