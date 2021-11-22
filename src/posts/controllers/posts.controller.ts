import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  UseInterceptors,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Post as PostI } from '../entities/post.entity';
import { Body, HttpException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly _postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostI[]> {
    return await this._postsService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/all')
  async findAllWithAllProperties(): Promise<PostI[]> {
    return await this._postsService.findAllWithAllProperties();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostI> {
    return await this._postsService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/all')
  async findAllWithOneProperties(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostI> {
    return await this._postsService.findOneWithAllProperties(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostI> {
    return await this._postsService.create(createPostDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostI> {
    return await this._postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this._postsService.remove(id);
  }
}
