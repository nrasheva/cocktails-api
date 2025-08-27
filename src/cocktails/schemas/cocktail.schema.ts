import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CocktailDocument = HydratedDocument<Cocktail>;

export class Ingredient {
  @Prop({ required: true })
  name: string;

  @Prop()
  measure?: string;
}

// export class RecipeStep {
//   @Prop({ required: true })
//   stepNumber: string;

//   @Prop({ required: true })
//   instruction: string;
// }

@Schema()
export class Cocktail {
  @Prop({ required: true, unique: true })
  idDrink?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  category: string;

  @Prop()
  alcoholic: string;

  @Prop()
  glass: string;

  @Prop()
  instructions: string;

  @Prop({ type: [Ingredient], required: true })
  ingredients: Ingredient[];

  @Prop()
  img: string;

  @Prop()
  thumb: string;

  // @Prop({ type: [RecipeStep], required: true })
  // recipe: RecipeStep[];

  // @Prop({ default: '' })
  // taste: string;

  // @Prop({ default: '' })
  // level: string;

  // @Prop({ default: '' })
  // time: string;
}

export const CocktailSchema = SchemaFactory.createForClass(Cocktail);
