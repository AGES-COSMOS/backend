import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

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
  @IsOptional()
  blocked?: boolean;

  @IsString()
  @IsOptional()
  registration_number?: string;

  @IsInt()
  @IsOptional()
  institution_id?: number;

  @IsInt()
  @IsOptional()
  role_id?: number;
}
