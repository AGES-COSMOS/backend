import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAboutUsDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
