import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PetsRepository } from '../repositories/pets.repository';
import { Pet } from '../entities/pet.entity';
import { UpdatePetDto, CreatePetDto } from '../dtos/pet.dto';
import { ImagesRepository } from '../repositories/images.repository';
import { join } from 'path';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class PetsService {
  constructor(
    private readonly _petsRepository: PetsRepository,
    private readonly _imagesRepository: ImagesRepository,
  ) {}

  async findAll() {
    return await this._petsRepository.find();
  }

  async findAllWithImages() {
    return await this._petsRepository.findWithImages();
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this._petsRepository.findOne(id);

    if (!pet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Pets with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return pet;
  }

  async create(
    createPetDto: CreatePetDto,
    files: Array<Express.Multer.File>,
  ): Promise<Pet> {
    const newPet = this._petsRepository.create(createPetDto);
    await this._petsRepository.save(newPet);

    if (files && files.length > 0) {
      this._imagesRepository.createRelation(newPet.id, files);
    }

    return newPet;
  }

  async update(
    id: number,
    updatePetDto: UpdatePetDto,
    files: Array<Express.Multer.File>,
  ): Promise<Pet> {
    const pet = await this._petsRepository.findOne(id);

    if (!pet) {
      files.forEach(async (image) => {
        const path = join(
          __dirname,
          '..',
          '..',
          '../public/images/',
          image.filename,
        );
        if (existsSync(path)) {
          await unlink(join(path));
        }
      });
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Pets with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (files && files.length > 0) {
      await this._imagesRepository.deleteInCascade(pet.id);
      this._imagesRepository.createRelation(pet.id, files);
    }

    this._petsRepository.merge(pet, updatePetDto);

    return await this._petsRepository.save(pet);
  }

  async remove(id: number) {
    const pet = await this._petsRepository.findOne(id);

    if (!pet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Pets with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this._petsRepository.softDelete(id);
    await this._imagesRepository.deleteInCascade(pet.id);

    return 'Pet deleted successfully!.';
  }

  async findByPostId(postId) {
    return await this._petsRepository.findByPostId(postId);
  }
}
