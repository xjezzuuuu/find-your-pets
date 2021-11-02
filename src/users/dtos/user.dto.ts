import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  roles_id: number;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsString()
  @ApiProperty()
  phone?: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
