import { CreateArtistDto } from "src/routes/artist/dto/create-artist.dto";
import { UpdateArtistDto } from "src/routes/artist/dto/update-artist.dto";
import { Artist } from "src/routes/artist/entities/artist.entity";
import { UUID } from "src/types/types";
import { v4 as uuidv4 } from 'uuid';

export class ArtistDb {
  private artists: Artist[] = [];

  public getAllArtists(): Artist[] {
    return this.artists;
  }

  public getArtistById(id: UUID): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  public createArtist(dto: CreateArtistDto): Artist {
    const artist = {
      id: uuidv4(),
      ...dto,
    };
    this.artists.push(artist);
    return artist;
  }

  public updateArtist(id: UUID, dto: UpdateArtistDto): Artist {
    const artist = this.getArtistById(id);
    const updatedArtist = {
      ...artist,
      ...dto,
    };
    this.artists = this.artists.map((artist) =>
      artist.id !== id ? artist : updatedArtist,
    );
    return updatedArtist;
  }

  public deleteArtist(id: UUID) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}

export const artistDb = new ArtistDb();