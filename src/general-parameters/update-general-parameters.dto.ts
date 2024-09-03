import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateGeneralParametersDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
