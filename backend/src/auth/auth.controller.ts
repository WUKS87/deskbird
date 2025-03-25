import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { token, role } = await this.authService.signIn(signInDto.email, signInDto.password);

    // Set the HttpOnly cookie
    res.cookie('jwt', token, {
        httpOnly: true,  // Prevents JavaScript access
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 3600 * 1000, // 1 hour expiration
    });

    // Return only the role to the Angular client
    return { role };
  }
}
