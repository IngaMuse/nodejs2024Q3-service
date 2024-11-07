import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { artistDb } from 'src/database/artistDb';
import { UUID } from 'src/types/types';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto): Artist {
    return artistDb.createArtist(createArtistDto);
  }

  findAll() {
    return artistDb.getAllArtists();
  }

  findOne(id: UUID) {
    const artist = artistDb.getArtistById(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    this.findOne(id);
    return artistDb.updateArtist(id, updateArtistDto);
  }

  remove(id: UUID) {
    const artist = this.findOne(id);
    if (artist) artistDb.deleteArtist(id);
  }
}
