import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _usersRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this._usersRepository.find({ relations: ['role'] });
  }

  async findOne(id: number): Promise<User> {
    return await this._usersRepository.findOne(id, { relations: ['role'] });
  }

  async findByEmail(email: string): Promise<User> {
    return await this._usersRepository.findByEmail(email);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this._usersRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this._usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this._usersRepository.softDelete(id);
  }
}
