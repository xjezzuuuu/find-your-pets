import { ConfigService, ConfigModule } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USER'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      entities: [__dirname + '/src/**/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: false,
      logging: true,
      migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: './src/database/migrations',
      },
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleAsyncOptions> =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
