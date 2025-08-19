import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Cocktail } from 'src/cocktails/schemas/cocktail.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Cocktail.name) private cocktailModel: Model<Cocktail>,
  ) {}

  async getShoppingList(userId: string): Promise<Cocktail[]> {
    const user = await this.userModel.findById(userId).populate('favorites').exec();

    if (!user) throw new NotFoundException('User not found');
    return user.shoppingList as unknown as Cocktail[];
  }

  async addToShoppingList(
    userId: string,
    cocktailId: string,
    ingredientId: string,
  ): Promise<{ message: string; ingredient: any }> {
    // Find the cocktail by cocktailId
    const cocktail = await this.cocktailModel.findById(cocktailId);

    if (!cocktail) {
      throw new NotFoundException('Cocktail not found');
    }

    // Find ingredient inside that cocktail
    const ingredient = cocktail.ingredients.find((ing: any) => ing._id?.toString() === ingredientId);

    console.log('Ingredient found:', ingredient);

    if (!ingredient) {
      throw new NotFoundException('Ingredient not found in this cocktail');
    }

    // Check if ingredient already exists in user's shopping list
    const user = await this.userModel.findById(userId, { shoppingList: 1 });
    const alreadyExists = user?.shoppingList.some(
      (item: any) => item?.ingredientId?.toString() === ingredientId || item?._id?.toString() === ingredientId,
    );

    if (alreadyExists) {
      throw new NotFoundException('Ingredient alreaydy exists in shopping list');
    }

    // Add ingredient to shopping list
    await this.userModel.findByIdAndUpdate(userId, {
      $push: {
        shoppingList: {
          ingredientId: new Types.ObjectId(ingredientId),
          name: ingredient.name,
          quantity: ingredient.quantity,
        },
      },
    });

    return {
      message: `${ingredient.name} added to your shopping list!`,
      ingredient,
    };
  }

  async removeFromShoppingList(userId: string, ingredientId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { shoppingList: { ingredientId: new Types.ObjectId(ingredientId) } },
    });
  }
}
