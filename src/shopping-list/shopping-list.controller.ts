import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CustomRequest } from 'src/auth/request.interface';

import { ShoppingListService } from './shopping-list.service';

@Controller('shopping-list')
@UseGuards(AuthenticatedGuard)
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Get()
  list(@Req() req: CustomRequest) {
    return this.shoppingListService.getShoppingList(req.user.id);
  }

  @Post()
  add(@Req() req: CustomRequest, @Body() body: { cocktailId: string; ingredientId: string }) {
    return this.shoppingListService.addToShoppingList(req.user.id, body.cocktailId, body.ingredientId);
  }

  @Delete(':ingredientName')
  remove(@Param('ingredientName') ingredientName: string, @Req() req: CustomRequest) {
    return this.shoppingListService.removeFromShoppingList(req.user.id, ingredientName);
  }

  @Patch(':ingredientName/toggle')
  update(@Param('ingredientName') ingredientName: string, @Req() req: CustomRequest) {
    return this.shoppingListService.togglePurchased(req.user.id, ingredientName);
  }
}
