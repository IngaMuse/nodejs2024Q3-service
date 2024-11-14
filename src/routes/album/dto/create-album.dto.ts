import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsUUID()
  readonly artistId: string | null;
}