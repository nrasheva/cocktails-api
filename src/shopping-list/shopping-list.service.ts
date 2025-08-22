import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

    const exists = user?.shoppingList.some((item: any) => item.name.toLowerCase() === ingredient.name.toLowerCase());
    if (exists) throw new ConflictException('Ingredient already exists');

    // Add ingredient to shopping list
    await this.userModel.findByIdAndUpdate(userId, {
      $push: {
        shoppingList: {
          name: ingredient.name,
          quantity: ingredient.quantity,
          purchased: false,
        },
      },
    });

    return {
      message: `${ingredient.name} added to your shopping list!`,
      ingredient,
    };
  }

  async removeFromShoppingList(userId: string, ingredientName: string): Promise<{ message: string }> {
    await this.userModel.updateOne(
      { _id: userId },
      {
        $pull: {
          shoppingList: {
            name: { $regex: `^${ingredientName.trim()}$`, $options: 'i' },
          },
        },
      },
    );

    return { message: `Removed from your shopping list!` };
  }

  async togglePurchased(userId: string, ingredientName: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const item = user.shoppingList.find((i) => i.name.toString().trim() === ingredientName.trim());
    if (!item) throw new NotFoundException('Ingredient not found in shopping list');

    item.purchased = !item.purchased;

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to update shopping list');
    }

    return { message: `Ingredient ${item.name} marked as ${item.purchased ? 'purchased' : 'not purchased'}` };
  }
}
