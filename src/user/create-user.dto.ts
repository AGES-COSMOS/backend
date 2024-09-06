import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  cpfcnpj?: string;

  @IsString()
  @IsOptional()
  photoURL?: string;

  @IsBoolean()
  @IsNotEmpty()
  blocked: boolean;

  @IsString()
  @IsOptional()
  registration_number?: string;

  @IsInt()
  @IsNotEmpty()
  institution_id: number;

  @IsInt()
  @IsNotEmpty()
  role_id: number;
}
