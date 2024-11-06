import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

class UnnecessaryFields {
  @IsUUID()
  readonly albumId: string | null;
  @IsUUID()
  readonly artistId: string | null;
}

export class CreateTrackDto extends PartialType(UnnecessaryFields) {
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  @IsNotEmpty()
  @IsString()
  name: string;
}