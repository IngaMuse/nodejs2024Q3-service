import { CreateArtistDto } from 'src/routes/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/routes/artist/dto/update-artist.dto';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import { UUID } from 'src/types/types';
import { v4 as uuidv4 } from 'uuid';
import { DB, db } from './db';

export class ArtistDb {
  constructor(private readonly db: DB) {}

  public getAllArtists(): Artist[] {
    return this.db.artists;
  }

  public getArtistById(id: UUID): Artist {
    return this.db.artists.find((artist) => artist.id === id);
  }

  public createArtist(dto: CreateArtistDto): Artist {
    const artist = {
      id: uuidv4(),
      ...dto,
    };
    this.db.artists.push(artist);
    return artist;
  }

  public updateArtist(id: UUID, dto: UpdateArtistDto): Artist {
    const artist = this.getArtistById(id);
    const updatedArtist = {
      ...artist,
      ...dto,
    };
    this.db.artists = this.db.artists.map((artist) =>
      artist.id !== id ? artist : updatedArtist,
    );
    return updatedArtist;
  }

  public deleteArtist(id: UUID) {
    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
    this.db.tracks = this.db.tracks.map((track) =>
      track.artistId !== id
        ? track
        : {
            ...track,
            artistId: null,
          },
    );
    this.db.albums = this.db.albums.map((album) =>
      album.artistId !== id
        ? album
        : {
            ...album,
            artistId: null,
          },
    );
  }
}

export const artistDb = new ArtistDb(db);
