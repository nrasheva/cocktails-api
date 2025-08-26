import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface ShoppingListItem {
  ingredientId: string;
  name: string;
  quantity: string;
  purchased: boolean;
}

@Schema()
export class User extends Document {
  [x: string]: any;
  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];

  @Prop({ type: String, default: null })
  refreshToken?: string | null;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Cocktail' }] })
  favorites: Types.ObjectId[];

  @Prop([{ ingredientId: String, name: String, quantity: String, purchased: { type: Boolean, default: false } }])
  shoppingList: ShoppingListItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);
