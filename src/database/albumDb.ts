import { CreateAlbumDto } from "src/routes/album/dto/create-album.dto";
import { UpdateAlbumDto } from "src/routes/album/dto/update-album.dto";
import { Album } from "src/routes/album/entities/album.entity";
import { UUID } from "src/types/types";
import { v4 as uuidv4 } from 'uuid';

export class AlbumDb { 

  private albums: Album[] = [];

  public getAllAlbums(): Album[] {
    return this.albums;
  }

  public getAlbumById(id: UUID): Album {
    return this.albums.find((album) => album.id === id);
  }

  public createAlbum(dto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...dto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public updateAlbum(id: UUID, dto: UpdateAlbumDto): Album {
    const album = this.getAlbumById(id);
    const updatedAlbum = {
      ...album,
      ...dto,
    };
    this.albums = this.albums.map((album) =>
      album.id !== id ? album : updatedAlbum,
    );
    return updatedAlbum;
  }

  public deleteAlbum(id: UUID) {
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}

export const albumDb = new AlbumDb();