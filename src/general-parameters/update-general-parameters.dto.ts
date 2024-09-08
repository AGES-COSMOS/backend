import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateGeneralParametersDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  instagramURL: string;

  @IsUrl()
  @IsNotEmpty()
  youtubeURL: string;

  @IsUrl()
  @IsNotEmpty()
  linkedinURL: string;
}
