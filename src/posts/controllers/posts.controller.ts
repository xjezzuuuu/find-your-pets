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
  UploadedFiles,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { Post as PostI } from '../entities/post.entity';
import { Body } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/all/:id')
  async findAllWithAllPropertiesExcept(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostI[]> {
    return await this._postsService.findAllWithAllPropertiesExcept(id);
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
  @Get('all/user/:id')
  async findAllWithOnePropertiesByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostI[]> {
    return await this._postsService.findOneWithAllPropertiesByUserId(id);
  }

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('images'))
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<PostI> {
    console.log(files);

    return await this._postsService.create(createPostDto, files);
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
