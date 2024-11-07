import { CreateTrackDto } from "src/routes/track/dto/create-track.dto";
import { UpdateTrackDto } from "src/routes/track/dto/update-track.dto";
import { Track } from "src/routes/track/entities/track.entity";
import { UUID } from "src/types/types";
import { v4 as uuidv4 } from 'uuid';
import { DB, db } from "./db";
import { Favorites } from "src/routes/favs/entities/fav.entity";
import { favsDb } from "./favsDb";

export class TrackDb {
  constructor( private readonly db: DB) {}

  public getAllTracks() {
    return this.db.tracks;
  }

  public getTrackById(id: UUID) {
    return this.db.tracks.find((track) => track.id === id);
  }

  public createTrack(dto: CreateTrackDto): Track {
    const { name, duration, artistId, albumId } = dto;
    const track: Track = {
      id: uuidv4(),
      name,
      duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };
    this.db.tracks.push(track);
    return track;
  }

  public updateTrack(id: UUID, dto: UpdateTrackDto): Track {
    const track = this.getTrackById(id);
    const updatedTrack = {
      ...track,
      ...dto,
    };
    this.db.tracks = this.db.tracks.map((track) =>
      track.id !== id ? track : updatedTrack,
    );
    return updatedTrack;
  }

  public deleteTrack(id: UUID) {
    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
    favsDb.removeTrackFromFavorites(id);
  }
}

export const trackDb = new TrackDb(db);