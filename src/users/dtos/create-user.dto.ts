import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
