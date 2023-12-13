import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CocktailDocument = HydratedDocument<Cocktail>;

@Schema()
export class Cocktail {
  @Prop()
  name: string;
}

export const CocktailSchema = SchemaFactory.createForClass(Cocktail);
