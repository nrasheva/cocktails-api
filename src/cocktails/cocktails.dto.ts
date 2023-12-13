import { IsString } from 'class-validator';

export class CreateCocktailDto {
  @IsString()
  name: string;
}
