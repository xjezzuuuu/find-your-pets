import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesRepository } from './repositories/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RolesRepository])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class UsersModule {}
