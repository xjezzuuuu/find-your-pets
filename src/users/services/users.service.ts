import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';
import { AuthRegisterDto } from '../../auth/dtos/auth.dto';

@Injectable()
export class UsersService {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return await this._usersRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this._usersRepository.findByEmail(email);

    if (user) return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this._usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async create(createUserDto: CreateUserDto | AuthRegisterDto): Promise<User> {
    const user = await this._usersRepository.findByEmail(createUserDto.email);
    let newUser: User;

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Email ${user.email} is already in use.`,
        },
        HttpStatus.CONFLICT,
      );
    }

    if (createUserDto instanceof CreateUserDto) {
      newUser = this._usersRepository.create(createUserDto);
      return await this._usersRepository.save(newUser);
    }

    newUser = this._usersRepository.create({
      roles_id: 2,
      ...createUserDto,
    });
    return await this._usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this._usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this._usersRepository.merge(user, updateUserDto);

    return await this._usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this._usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this._usersRepository.softDelete(id);
  }

  async isAdmin(roleId: number): Promise<boolean> {
    return roleId === 1 ? true : false;
  }
}
