import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesRepository } from './repositories/roles.repository';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolesRepository, UsersRepository])],
  controllers: [RolesController, UsersController],
  providers: [RolesService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
