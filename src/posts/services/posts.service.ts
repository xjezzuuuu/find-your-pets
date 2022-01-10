import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { PetsService } from '../../pets/services/pets.service';
import { Not } from 'typeorm';
import { ImagesRepository } from '../../pets/repositories/images.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly _postsRepository: PostRepository,
    private readonly _petsService: PetsService,
    private readonly _imagesRepository: ImagesRepository,
  ) {}
  async findAll(): Promise<Post[]> {
    return await this._postsRepository.find();
  }

  async findAllWithAllProperties(): Promise<Post[]> {
    return await this._postsRepository.find({
      relations: ['user', 'pet', 'pet.images', 'post_type', 'commune'],
    });
  }

  async findAllWithAllPropertiesExcept(id: number): Promise<Post[]> {
    return await this._postsRepository.find({
      relations: ['user', 'pet', 'pet.images', 'post_type', 'commune'],
      take: 10,
      where: {
        id: Not(id),
      },
    });
  }

  async findOne(id): Promise<Post> {
    return await this._postsRepository.findOne(id);
  }

  async findOneWithAllProperties(id): Promise<Post> {
    return await this._postsRepository.findOne(id, {
      relations: [
        'user',
        'pet',
        'pet.images',
        'post_type',
        'commune',
        'commune.province',
        'commune.province.region',
      ],
    });
  }

  async findOneWithAllPropertiesByUserId(id): Promise<Post[]> {
    return await this._postsRepository.find({
      relations: [
        'user',
        'pet',
        'pet.images',
        'post_type',
        'commune',
        'commune.province',
        'commune.province.region',
      ],
      where: {
        users_id: id,
      },
    });
  }

  async create(
    createPostDto: CreatePostDto,
    files: Array<Express.Multer.File>,
  ): Promise<Post> {
    console.log(files);
    const newPost = this._postsRepository.create(createPostDto);
    await this._postsRepository.save(newPost);

    if (files && files.length > 0) {
      this._imagesRepository.createRelation(newPost.pet.id, files);
    }

    return newPost;
  }

  async update(id, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this._postsRepository.findOne(id);

    if (!post) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Post with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this._postsRepository.merge(post, updatePostDto);

    return this._postsRepository.save(post);
  }

  async remove(id: number) {
    const post = await this._postsRepository.findOne(id);

    if (!post) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Post with id ${id} not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const pet = await this._petsService.findByPostId(post.id);

    if (pet) {
      await this._petsService.remove(pet.id);
    }

    await this._postsRepository.softDelete(id);

    return {
      status: HttpStatus.OK,
      message: `Post with id ${id} deleted successfully!`,
    };
  }
}
