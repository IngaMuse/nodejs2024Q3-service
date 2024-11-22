import { FavoritesResponse } from 'src/routes/favs/entities/fav.entity';
import { UUID } from 'src/types/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/routes/prisma/prisma.service';

@Injectable()
export class FavsDb {
  constructor(private prisma: PrismaService) {}

  public async getAllFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: 0 },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    return {
      artists: favorites?.artists ? [...favorites.artists] : [],
      albums: favorites?.albums ? [...favorites?.albums] : [],
      tracks: favorites?.tracks ? [...favorites?.tracks] : [],
    };
  }

  public async addTrackToFavorites(id: UUID): Promise<void> {
    await this.prisma.favorites.upsert({
      where: { id: 0 },
      create: {
        tracks: {
          connect: { id },
        },
      },
      update: {
        tracks: {
          connect: { id },
        },
      },
    });
  }

  public async addAlbumToFavorites(id: UUID) {
    return await this.prisma.favorites.upsert({
      where: { id: 0 },
      create: {
        albums: {
          connect: { id },
        },
      },
      update: {
        albums: {
          connect: { id },
        },
      },
    });
  }

  public async addArtistToFavorites(id: UUID) {
    return await this.prisma.favorites.upsert({
      where: { id: 0 },
      create: {
        artists: {
          connect: { id },
        },
      },
      update: {
        artists: {
          connect: { id },
        },
      },
    });
  }
  public async removeTrackFromFavorites(id: UUID) {
    await this.prisma.favorites.update({
      where: { id: 0 },
      data: {
        tracks: {
          disconnect: { id },
        },
      },
    });
  }

  public async removeAlbumFromFavorites(id: UUID) {
    await this.prisma.favorites.update({
      where: { id: 0 },
      data: {
        albums: {
          disconnect: { id },
        },
      },
    });
  }

  public async removeArtistFromFavorites(id: UUID) {
    await this.prisma.favorites.update({
      where: { id: 0 },
      data: {
        artists: {
          disconnect: { id },
        },
      },
    });
  }
}

export const favsDb = new FavsDb(new PrismaService());
