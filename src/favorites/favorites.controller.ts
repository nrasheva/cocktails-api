import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CustomRequest } from 'src/auth/request.interface';

import { FavoritesService } from './favorites.service';

@Controller('favorites')
@UseGuards(AuthenticatedGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':cocktailId')
  add(@Param('cocktailId') cocktailId: string, @Req() req: CustomRequest) {
    return this.favoritesService.addToFavorites(req.user?.id, cocktailId);
  }

  @Delete(':cocktailId')
  remove(@Param('cocktailId') cocktailId: string, @Req() req: CustomRequest) {
    return this.favoritesService.removeFromFavorites(req.user?.id, cocktailId);
  }

  @Get()
  list(@Req() req: CustomRequest) {
    return this.favoritesService.getFavorites(req.user?.id);
  }
}
