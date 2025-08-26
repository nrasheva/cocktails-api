import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';

import { CreateUserDto, signInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<void> {
    return this.authService.register(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: signInDto): Promise<any> {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('refresh')
  async refresh(@Body() body: { userId: string; refresh_token: string }) {
    return this.authService.refreshTokens(body.userId, body.refresh_token);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = (req as Request & { user: any }).user;
    return this.authService.logout(user._id);
  }
}
