import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { AuthLoginDto, AuthRegisterDto } from '../dtos/auth.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const { password, created_at, updated_at, deleted_at, ...user } =
      await this.validateUser(authLoginDto);

    const payload = { ...user };

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(authRegisterDto: AuthRegisterDto) {
    const user: User = await this.usersService.create(authRegisterDto);

    const payload = { ...user };

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      access_token: this.jwtService.sign(payload),
    };
  }

  async renew(req) {
    const { ...user } = req.user;

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      access_token: this.jwtService.sign(user),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findByEmail(email);

    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
