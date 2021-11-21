import { EntityRepository, Repository } from 'typeorm';

import { Pet } from '../entities/pet.entity';

@EntityRepository(Pet)
export class PetsRepository extends Repository<Pet> {
  async findWithImages() {
    return await this.find({ relations: ['images'] });
  }
}
