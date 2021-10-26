import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { throws } from 'assert';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return await this._usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this._usersService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this._usersService.findByEmail(createUserDto.email);

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FOUND,
          error: `User with email ${user.email} it already exist.`,
        },
        HttpStatus.FOUND,
      );
    }

    return this._usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this._usersService.findOne(id);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this._usersService.update(id, updateUserDto).catch((e) => {
      if (e.errno === 1062) {
        throw new HttpException(
          {
            status: HttpStatus.FOUND,
            error: `User with email ${updateUserDto.email} it already exist.`,
          },
          HttpStatus.FOUND,
        );
      }
    });

    return await this._usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this._usersService.findOne(id);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this._usersService.remove(id);

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: `User with id ${id} deleted!`,
      },
      HttpStatus.ACCEPTED,
    );
  }
}
