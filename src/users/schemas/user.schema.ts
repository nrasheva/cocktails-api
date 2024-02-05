import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  [x: string]: any;
  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([String])
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
