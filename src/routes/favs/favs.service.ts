import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponse } from './entities/fav.entity';
import { favsDb } from 'src/database/favsDb';
import { UUID } from 'src/types/types';
import { trackDb } from 'src/database/trackDb';
import { albumDb } from 'src/database/albumDb';
import { artistDb } from 'src/database/artistDb';

@Injectable()
export class FavsService {
  async findAll(): Promise<FavoritesResponse> {
    return await favsDb.getAllFavorites();
  }

  async addArtist(id: UUID) {
    const artist = await artistDb.getArtistById(id);
    if (!artist) throw new UnprocessableEntityException();
    await favsDb.addArtistToFavorites(id);
  }

  async addAlbum(id: UUID) {
    const album = await albumDb.getAlbumById(id);
    if (!album) throw new UnprocessableEntityException();
    await favsDb.addAlbumToFavorites(id);
  }

  async addTrack(id: UUID) {
    const track = await trackDb.getTrackById(id);
    if (!track) throw new UnprocessableEntityException();
    await favsDb.addTrackToFavorites(id);
  }

  async removeArtist(id: UUID): Promise<void> {
    const artist = await artistDb.getArtistById(id);
    if (!artist) throw new NotFoundException();
    await favsDb.removeArtistFromFavorites(id);
  }

  async removeAlbum(id: UUID): Promise<void> {
    const album = await albumDb.getAlbumById(id);
    if (!album) throw new NotFoundException();
    await favsDb.removeAlbumFromFavorites(id);
  }

  async removeTrack(id: UUID): Promise<void> {
    const track = await trackDb.getTrackById(id);
    if (!track) throw new NotFoundException();
    await favsDb.removeTrackFromFavorites(id);
  }
}
