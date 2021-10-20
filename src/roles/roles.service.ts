import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private _rolesRepository: Repository<Role>,
  ) {}

  findAll() {
    return this._rolesRepository.find();
  }

  findOne(id: number) {
    return this._rolesRepository.findOne(id);
  }

  create(createRoleDto: CreateRoleDto) {
    return this._rolesRepository.save(createRoleDto);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this._rolesRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this._rolesRepository.softDelete(id);
  }
}
