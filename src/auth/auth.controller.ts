// src/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto/auth.dto';
import { AuthService } from './auth.service';
import { User } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authDTO: AuthDTO): Promise<User> {
    const { email, password, name } = authDTO;
    return await this.authService.signUp(email, password, name);
  }  

  @Post('signin')
  async signIn(@Body() authDTO: AuthDTO): Promise<void> {
    const { email, password } = authDTO;
    await this.authService.signIn(email, password);
  }
}
