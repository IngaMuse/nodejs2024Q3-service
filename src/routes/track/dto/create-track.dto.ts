import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;

  @IsOptional()
  @IsUUID()
  readonly albumId?: string | null;

  @IsOptional()
  @IsUUID()
  readonly artistId?: string | null;
}