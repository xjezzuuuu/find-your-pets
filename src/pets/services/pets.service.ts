import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PetsRepository } from '../repositories/pets.repository';
import { Pet } from '../entities/pet.entity';
import { UpdatePetDto, CreatePetDto } from '../dtos/pet.dto';
import { ImagesRepository } from '../repositories/images.repository';

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
    console.log(newPet.id);

    if (files.length > 0) {
      this._imagesRepository.createRelation(newPet.id, files);
    }

    return newPet;
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
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
    return this._petsRepository.merge(pet, updatePetDto);
  }

  async remove(id: number) {
    const pet = this._petsRepository.findOne(id);

    if (!pet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Pets with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this._petsRepository.softDelete(id);
  }
}
