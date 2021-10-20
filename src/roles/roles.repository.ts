import { EntityRepository, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@EntityRepository(Role)
export class UserRepository extends Repository<Role> {
  findByName() {
    return 'hola';
  }
}
