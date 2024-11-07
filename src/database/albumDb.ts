import { CreateAlbumDto } from "src/routes/album/dto/create-album.dto";
import { UpdateAlbumDto } from "src/routes/album/dto/update-album.dto";
import { Album } from "src/routes/album/entities/album.entity";
import { UUID } from "src/types/types";
import { v4 as uuidv4 } from 'uuid';
import { DB, db } from "./db";

export class AlbumDb { 

  constructor( private readonly db: DB) {}

  public getAllAlbums(): Album[] {
    return this.db.albums;
  }

  public getAlbumById(id: UUID): Album {
    return this.db.albums.find((album) => album.id === id);
  }

  public createAlbum(dto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...dto,
    };
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  public updateAlbum(id: UUID, dto: UpdateAlbumDto): Album {
    const album = this.getAlbumById(id);
    const updatedAlbum = {
      ...album,
      ...dto,
    };
    this.db.albums = this.db.albums.map((album) =>
      album.id !== id ? album : updatedAlbum,
    );
    return updatedAlbum;
  }

  public deleteAlbum(id: UUID) {
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
    this.db.tracks = this.db.tracks.map((track) =>
      track.albumId !== id
        ? track
        : {
            ...track,
            albumId: null,
          },
    );
  }
}

export const albumDb = new AlbumDb(db);