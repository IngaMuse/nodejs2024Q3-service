import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { albumDb } from 'src/database/albumDb';
import { UUID } from 'src/types/types';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto): Album {
    return albumDb.createAlbum(createAlbumDto);
  }

  findAll() {
    return albumDb.getAllAlbums();
  }

  findOne(id: UUID): Album {
    const album = albumDb.getAlbumById(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  update(id: UUID, updateAlbumDto: UpdateAlbumDto): Album {
    this.findOne(id);
    return albumDb.updateAlbum(id, updateAlbumDto);
  }

  remove(id: UUID) {
    const album = this.findOne(id);
    if (album) albumDb.deleteAlbum(id);
  }
}
