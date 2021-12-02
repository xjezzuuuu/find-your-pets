import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jtw-auth.guard';
import { AuthLoginDto, AuthRegisterDto } from '../dtos/auth.dto';
import { RolesGuard } from '../guards/roles.guard';
import { UsersService } from '../../users/services/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this._authService.login(authLoginDto);
  }

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return await this._authService.register(authRegisterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('renew')
  async renew(@Req() req) {
    return await this._authService.renew(req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('protected')
  async test() {
    return 'Success!';
  }
}
