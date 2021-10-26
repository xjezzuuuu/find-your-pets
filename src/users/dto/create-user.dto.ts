import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  roles_id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
