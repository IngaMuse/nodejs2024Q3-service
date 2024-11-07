import { FavoritesResponse } from 'src/routes/favs/entities/fav.entity';
import { DB, db } from './db';
import { UUID } from 'src/types/types';
import { artistDb } from './artistDb';
import { albumDb } from './albumDb';
import { trackDb } from './trackDb';

export class FavsDb {
  constructor(private readonly db: DB) {}

  public getAllFavorites(): FavoritesResponse {
    return {
      artists: this.db.favs.artists.map((id) => artistDb.getArtistById(id)),
      albums: this.db.favs.albums.map((id) => albumDb.getAlbumById(id)),
      tracks: this.db.favs.tracks.map((id) => trackDb.getTrackById(id)),
    };
  }

  public addTrackToFavorites(id: UUID) {
    this.db.favs.tracks.push(id);
  }

  public addAlbumToFavorites(id: UUID) {
    this.db.favs.albums.push(id);
  }

  public addArtistToFavorites(id: UUID) {
    this.db.favs.artists.push(id);
  }

  public removeTrackFromFavorites(id: UUID) {
    this.db.favs.tracks = this.db.favs.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  public removeAlbumFromFavorites(id: UUID) {
    this.db.favs.albums = this.db.favs.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  public removeArtistFromFavorites(id: UUID) {
    this.db.favs.artists = this.db.favs.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}

export const favsDb = new FavsDb(db);
