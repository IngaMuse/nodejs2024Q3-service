import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from './entities/fav.entity';
import { UUID } from 'src/types/types';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.favsService.addTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.favsService.addAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.favsService.addArtist(id);
  }

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return await this.favsService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.favsService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.favsService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.favsService.removeArtist(id);
  }
}
