import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CocktailDocument = HydratedDocument<Cocktail>;

class Ingredient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: string;
}

class RecipeStep {
  @Prop({ required: true })
  stepNumber: string;

  @Prop({ required: true })
  instruction: string;
}

@Schema()
export class Cocktail {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  img: string;

  @Prop({ type: [Ingredient], required: true })
  ingredients: Ingredient[];

  @Prop({ type: [RecipeStep], required: true })
  recipe: RecipeStep[];

  @Prop({ required: true })
  taste: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  level: string;
}

export const CocktailSchema = SchemaFactory.createForClass(Cocktail);
