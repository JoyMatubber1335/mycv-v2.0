import {
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
}
