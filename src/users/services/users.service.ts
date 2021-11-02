import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async findAll() {
    return await this._usersRepository.find();
  }

  async findOne(id: number) {
    return await this._usersRepository.findOne(id);
  }

  async create(createRoleDto: CreateUserDto) {
    const newRole = this._usersRepository.create(createRoleDto);
    return await this._usersRepository.save(newRole);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const role = await this._usersRepository.findOne(id);

    if (!role) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this._usersRepository.save(updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
