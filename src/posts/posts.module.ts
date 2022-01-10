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
import { ImagesRepository } from '../pets/repositories/images.repository';
import { MulterModule } from '@nestjs/platform-express';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      Commune,
      Province,
      Region,
      Post_Type,
      ImagesRepository,
    ]),
    MulterModule.registerAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => ({
        storage: diskStorage({
          destination: configService.files.dest,
          filename: (req, file, cb) => {
            cb(null, uuidv4() + extname(file.originalname));
          },
        }),
      }),
    }),
    PetsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
