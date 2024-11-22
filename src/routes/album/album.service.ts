import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { albumDb } from 'src/database/albumDb';
import { UUID } from 'src/types/types';

@Injectable()
export class AlbumService {
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      return await albumDb.createAlbum(createAlbumDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Album[]> {
    return await albumDb.getAllAlbums();
  }

  async findOne(id: UUID): Promise<Album> {
    const album = await albumDb.getAlbumById(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  async update(id: UUID, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    await this.findOne(id);
    try {
      return await albumDb.updateAlbum(id, updateAlbumDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: UUID): Promise<void> {
    const album = await this.findOne(id);
    if (album) await albumDb.deleteAlbum(id);
  }
}
