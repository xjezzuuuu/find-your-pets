import { Injectable } from '@nestjs/common';

import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { RolesRepository } from '../repositories/roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly _rolesRepository: RolesRepository) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new user';
  }

  findAll() {
    this._rolesRepository;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
