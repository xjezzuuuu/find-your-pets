import { EntityRepository, Repository } from 'typeorm';

import { Pet } from '../entities/pet.entity';

@EntityRepository(Pet)
export class PetsRepository extends Repository<Pet> {
  async findWithImages() {
    return await this.find({ relations: ['images'] });
  }

  async findByPostId(postId) {
    const pets = await this.find({ relations: ['post'] });
    return pets.find((pet) => pet.post.id === postId);
  }
}
