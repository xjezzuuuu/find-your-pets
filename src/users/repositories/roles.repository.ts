import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {
  findByName() {
    return 'hola';
  }
}
