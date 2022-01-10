import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Image } from '../entities/image.entity';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  race: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  size: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  story: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  character: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  social: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  energy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  friendship: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  images: Image[];
}

export class UpdatePetDto extends PartialType(CreatePetDto) {}
