import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto } from 'src/auth/auth.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const createdUser = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
