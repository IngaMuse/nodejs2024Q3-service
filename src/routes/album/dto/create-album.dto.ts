import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

class UnnecessaryFields {
  @IsUUID()
  readonly artistId: string | null;
}

export class CreateAlbumDto extends PartialType(UnnecessaryFields) {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
}
