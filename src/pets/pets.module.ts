import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PetsService } from './services/pets.service';
import { PetsController } from './controllers/pets.controller';
import { PetsRepository } from './repositories/pets.repository';
import { UsersModule } from '../users/users.module';
import { ImagesRepository } from './repositories/images.repository';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
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
    UsersModule,
    TypeOrmModule.forFeature([PetsRepository, ImagesRepository]),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
