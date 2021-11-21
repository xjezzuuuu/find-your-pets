import {
  Controller,
  UseGuards,
  Get,
  ParseIntPipe,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { PetsService } from '../services/pets.service';
import { JwtAuthGuard } from '../../auth/guards/jtw-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pet } from '../entities/pet.entity';
import { Body, Post } from '@nestjs/common';
import { UpdatePetDto, CreatePetDto } from '../dtos/pet.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly _petsService: PetsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get()
  findAll(): Promise<Pet[]> {
    return this._petsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('images')
  findAllWithImages(): Promise<Pet[]> {
    return this._petsService.findAllWithImages();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return this._petsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(
    @Body() createPetDto: CreatePetDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Pet> {
    return this._petsService.create(createPetDto, files);
  }

  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePetDto: UpdatePetDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Pet> {
    return this._petsService.update(id, updatePetDto, files);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this._petsService.remove(id);
  }
}
