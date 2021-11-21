import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

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
  @IsOptional()
  @ApiProperty()
  character: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  social: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  energy: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  friendship: string;
}

export class UpdatePetDto extends PartialType(CreatePetDto) {}
