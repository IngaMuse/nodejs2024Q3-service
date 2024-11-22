import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { artistDb } from 'src/database/artistDb';
import { UUID } from 'src/types/types';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    try {
      return await artistDb.createArtist(createArtistDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Artist[]> {
    return await artistDb.getAllArtists();
  }

  async findOne(id: UUID): Promise<Artist> {
    const artist = await artistDb.getArtistById(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    await this.findOne(id);
    try {
      return await artistDb.updateArtist(id, updateArtistDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: UUID) {
    const artist = await this.findOne(id);
    if (artist) artistDb.deleteArtist(id);
  }
}
