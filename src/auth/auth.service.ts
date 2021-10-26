import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this._usersService.findByEmail(email);

    if (user && user.password === password) {
      return user;
    }
  }

  async login(user: any) {
    const payload = { firts_name: user.first_name, sub: user.id };

    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
