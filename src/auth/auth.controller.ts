import { Controller, Post, UseGuards, Request, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
  ) {}

  @Post('login')
  async login( @Body() loginDto: LoginDto) {

    const user = await this.authService.validateUser(loginDto);

    if (!user) {

      throw new UnauthorizedException('Usuario no encontrado');

    }

    return user;

  }

}
