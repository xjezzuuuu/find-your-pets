import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { PetsService } from '../../pets/services/pets.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly _postsRepository: PostRepository,
    private readonly _petsService: PetsService,
  ) {}
  async findAll(): Promise<Post[]> {
    return await this._postsRepository.find();
  }

  async findAllWithAllProperties(): Promise<Post[]> {
    return await this._postsRepository.find({
      relations: ['user', 'pet', 'post_type', 'commune'],
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
        'post_type',
        'commune',
        'commune.province',
        'commune.province.region',
      ],
    });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this._postsRepository.create(createPostDto);
    await this._postsRepository.save(newPost);

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
