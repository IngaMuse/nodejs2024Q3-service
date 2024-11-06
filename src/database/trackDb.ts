import { CreateTrackDto } from "src/routes/track/dto/create-track.dto";
import { UpdateTrackDto } from "src/routes/track/dto/update-track.dto";
import { Track } from "src/routes/track/entities/track.entity";
import { UUID } from "src/types/types";
import { v4 as uuidv4 } from 'uuid';

export class TrackDb {

  private tracks: Track[] = [];

  public getAllTracks() {
    return this.tracks;
  }

  public getTrackById(id: UUID) {
    return this.tracks.find((track) => track.id === id);
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
    this.tracks.push(track);
    return track;
  }

  public updateTrack(id: UUID, dto: UpdateTrackDto): Track {
    const track = this.getTrackById(id);
    const updatedTrack = {
      ...track,
      ...dto,
    };
    this.tracks = this.tracks.map((track) =>
      track.id !== id ? track : updatedTrack,
    );
    return updatedTrack;
  }

  public deleteTrack(id: UUID) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  public removeAlbumId(albumId: UUID) {
    this.tracks.forEach(track => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
}

}

export const trackDb = new TrackDb();