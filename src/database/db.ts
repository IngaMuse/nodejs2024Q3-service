import { Album } from "src/routes/album/entities/album.entity";
import { Artist } from "src/routes/artist/entities/artist.entity";
import { Favorites } from "src/routes/favs/entities/fav.entity";
import { Track } from "src/routes/track/entities/track.entity";
import { User } from "src/routes/user/entities/user.entity";


export interface DB {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
  users: User[];
  favs: Favorites;
}

export const db: DB = {
  albums: [],
  artists: [],
  tracks: [],
  users: [],
  favs: {
    artists: [],
    albums: [],
    tracks: [],
  },
};