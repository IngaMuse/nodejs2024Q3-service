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
  findAll(): FavoritesResponse {
    return favsDb.getAllFavorites();
  }

  addArtist(id: UUID) {
    const artist = artistDb.getArtistById(id);
    if (!artist) throw new UnprocessableEntityException();
    favsDb.addArtistToFavorites(id);
  }

  addAlbum(id: UUID) {
    const album = albumDb.getAlbumById(id);
    if (!album) throw new UnprocessableEntityException();
    favsDb.addAlbumToFavorites(id);
  }

  addTrack(id: UUID) {
    const track = trackDb.getTrackById(id);
    if (!track) throw new UnprocessableEntityException();
    favsDb.addTrackToFavorites(id);
  }

  removeArtist(id: UUID) {
    const artist = artistDb.getArtistById(id);
    if (!artist) throw new NotFoundException();
    favsDb.removeArtistFromFavorites(id);
  }

  removeAlbum(id: UUID) {
    const album = albumDb.getAlbumById(id);
    if (!album) throw new NotFoundException();
    favsDb.removeAlbumFromFavorites(id);
  }

  removeTrack(id: UUID) {
    const track = trackDb.getTrackById(id);
    if (!track) throw new NotFoundException();
    favsDb.removeTrackFromFavorites(id);
  }
}
