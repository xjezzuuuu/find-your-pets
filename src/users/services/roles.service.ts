import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { RolesRepository } from '../repositories/roles.repository';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly _rolesRepository: RolesRepository) {}

  async findAll(): Promise<Role[]> {
    return await this._rolesRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this._rolesRepository.findOne(id);

    if (!role) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Role with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return role;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this._rolesRepository.create(createRoleDto);
    return await this._rolesRepository.save(newRole);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this._rolesRepository.findOne(id);

    if (!role) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Role with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this._rolesRepository.merge(role, updateRoleDto);

    return await this._rolesRepository.save(role);
  }

  async remove(id: number) {
    const role = await this._rolesRepository.findOne(id);

    if (!role) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Role with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this._rolesRepository.softDelete(id);
  }
}
