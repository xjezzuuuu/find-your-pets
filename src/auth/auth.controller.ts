import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this._authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req) {
    return req.user;
  }
}
