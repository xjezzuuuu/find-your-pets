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
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.rolesService.findOne(+id);

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
    return this.rolesService.create(createRoleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const role = await this.rolesService.findOne(+id);

    if (!role) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Role with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.rolesService.remove(+id);

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: `Role with id ${id} deleted!`,
      },
      HttpStatus.ACCEPTED,
    );
  }
}
