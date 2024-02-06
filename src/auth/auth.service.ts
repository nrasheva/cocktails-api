import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

import { CreateUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<any> {
    const existingUser = await this.usersService.findOne(userDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    return this.usersService.create(userDto);
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
      roles: user.roles,
    };
  }
}
