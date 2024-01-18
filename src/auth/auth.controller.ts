import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateUserDto, signInDto } from './auth.dto';
import { AuthService } from './auth.service';

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
}
