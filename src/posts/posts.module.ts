import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PostRepository } from './repositories/post.repository';
import { Commune } from './entities/commune.entity';
import { Province } from './entities/province.entity';
import { Region } from './entities/region.entity';
import { Post_Type } from './entities/type.entity';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      Commune,
      Province,
      Region,
      Post_Type,
    ]),
    PetsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
