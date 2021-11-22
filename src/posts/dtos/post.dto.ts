import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmpty,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  users_id: number;

  @IsEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  pets_id: number;

  @IsEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  post_types_id: number;

  @IsEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  communes_id: number;

  @IsEmpty()
  @IsString()
  @Length(5, 45)
  @ApiProperty()
  title: string;

  @IsEmpty()
  @IsString()
  @Length(20, 225)
  @ApiProperty()
  description: string;

  @IsEmpty()
  @IsString()
  @Length(5, 45)
  @ApiProperty()
  address: string;

  @IsEmpty()
  @IsString()
  @IsLatitude()
  @ApiProperty()
  latitude: string;

  @IsEmpty()
  @IsString()
  @IsLongitude()
  @ApiProperty()
  longitude: string;

  @IsEmpty()
  @IsBoolean()
  @IsLongitude()
  @ApiProperty()
  status: boolean;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
