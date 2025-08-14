import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Cocktail } from 'src/cocktails/schemas/cocktail.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Cocktail.name) private cocktailModel: Model<Cocktail>,
  ) {}

  async addToFavorites(userId: string, cocktailId: string): Promise<void> {
    const cocktailExists = await this.cocktailModel.exists({ _id: cocktailId });
    if (!cocktailExists) throw new NotFoundException('Cocktail not found');

    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { favorites: new Types.ObjectId(cocktailId) }, // prevents duplicates
    });
  }

  async removeFromFavorites(userId: string, cocktailId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { favorites: new Types.ObjectId(cocktailId) },
    });
  }

  async getFavorites(userId: string): Promise<Cocktail[]> {
    const user = await this.userModel.findById(userId).populate('favorites').exec();

    if (!user) throw new NotFoundException('User not found');
    return user.favorites as unknown as Cocktail[];
  }
}
