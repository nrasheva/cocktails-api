import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  [x: string]: any;
  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([String])
  roles: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Cocktail' }] })
  favorites: Types.ObjectId[];

  @Prop([
    {
      ingredientId: String,
      name: String,
      quantity: String,
    },
  ])
  shoppingList: { ingredientId: string; name: string; quantity: string }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
