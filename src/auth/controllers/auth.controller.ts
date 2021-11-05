import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jtw-auth.guard';
import { AuthLoginDto, AuthRegisterDto } from '../dtos/auth.dto';
import { RolesGuard } from '../guards/roles.guard';
import { UsersService } from '../../users/services/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this._authService.login(authLoginDto);
  }

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return this._usersService.create(authRegisterDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('protected')
  async test() {
    return 'Success!';
  }
}
