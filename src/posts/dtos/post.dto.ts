import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Pet } from '../../pets/entities/pet.entity';
import { IsOptional, MinLength, IsNotEmpty, IsArray, IsBooleanString } from 'class-validator';
import { Image } from '../../pets/entities/image.entity';
import {
  IsBoolean,
  IsEmpty,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @ApiProperty()
  users_id: number;

  @IsOptional()
  @IsObject()
  @ApiProperty()
  pet: Pet;

  @IsOptional()
  @ApiProperty()
  post_types_id: number;

  @ApiProperty()
  communes_id: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @Length(20, 225)
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @Length(5, 45)
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsString()
  @IsLatitude()
  @ApiProperty()
  latitude: string;

  @IsOptional()
  @IsString()
  @IsLongitude()
  @ApiProperty()
  longitude: string;

  @IsOptional()
  @IsBooleanString()
  @ApiProperty()
  status: boolean;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
