import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config/config';
import { enviroments } from './config/enviroments';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: {
        redirect: false,
        index: false,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().empty(''),
        DB_DATABASE: Joi.string().required(),
        UPLOADS_FOLDER: Joi.string().required(),
        TYPEORM_ENTITIES: Joi.string().required(),
        TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
        TYPEORM_MIGRATIONS: Joi.string().required(),
        TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
        TYPEORM_MIGRATIONS_RUN: Joi.string().required(),
        TYPEORM_LOGGING: Joi.boolean().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PetsModule,
    PostsModule,
  ],
})
export class AppModule {}
