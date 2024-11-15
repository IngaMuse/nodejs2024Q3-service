import { CreateAlbumDto } from 'src/routes/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/routes/album/dto/update-album.dto';
import { Album } from 'src/routes/album/entities/album.entity';
import { UUID } from 'src/types/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/routes/prisma/prisma.service';
@Injectable()
export class AlbumDb {
  constructor(private prisma: PrismaService) {}

  public async getAllAlbums(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  public async getAlbumById(id: UUID): Promise<Album> {
    return await this.prisma.album.findUnique({
      where: { id },
    });
  }

  public async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const { name, year, artistId } = dto;
    return this.prisma.album.create({
      data: {
        name,
        year,
        ...(artistId && {
          artist: {
            connect: {
              id: artistId,
            },
          },
        }),
      },
    });
  }

  public async updateAlbum(id: UUID, dto: UpdateAlbumDto): Promise<Album> {
    return this.prisma.album.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  public async deleteAlbum(id: UUID): Promise<void> {
    await this.prisma.album.delete({
      where: { id },
    });
  }
}

export const albumDb = new AlbumDb(new PrismaService);
