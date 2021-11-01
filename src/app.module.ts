import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config/config';
import { enviroments } from './config/enviroments';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
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
        TYPEORM_ENTITIES: Joi.string().required(),
        TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
        TYPEORM_MIGRATIONS: Joi.string().required(),
        TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
        TYPEORM_MIGRATIONS_RUN: Joi.string().required(),
        TYPEORM_LOGGING: Joi.boolean().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
