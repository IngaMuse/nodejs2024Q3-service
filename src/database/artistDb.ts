import { CreateArtistDto } from 'src/routes/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/routes/artist/dto/update-artist.dto';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import { UUID } from 'src/types/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/routes/prisma/prisma.service';

@Injectable()
export class ArtistDb {
  constructor(private prisma: PrismaService) {}

  public async getAllArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  public async getArtistById(id: UUID): Promise<Artist> {
    return await this.prisma.artist.findUnique({
      where: { id },
    });
  }

  public async createArtist(dto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: {
        ...dto,
      },
    });
  }

  public async updateArtist(id: UUID, dto: UpdateArtistDto): Promise<Artist> {
    return await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  public async deleteArtist(id: UUID): Promise<void> {
    await this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }
}

export const artistDb = new ArtistDb(new PrismaService());
