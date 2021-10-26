import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly _rolesService: RolesService) {}

  @Get()
  findAll() {
    return this._rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this._rolesService.findOne(id);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Role with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this._rolesService.create(createRoleDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this._rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const role = await this._rolesService.findOne(id);

    if (!role) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Role with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this._rolesService.remove(+id);

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: `Role with id ${id} deleted!`,
      },
      HttpStatus.ACCEPTED,
    );
  }
}
