import { CreateTrackDto } from 'src/routes/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/routes/track/dto/update-track.dto';
import { Track } from 'src/routes/track/entities/track.entity';
import { UUID } from 'src/types/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/routes/prisma/prisma.service';

@Injectable()
export class TrackDb {
  constructor(private prisma: PrismaService) {}

  public async getAllTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  public async getTrackById(id: UUID): Promise<Track> {
    return await this.prisma.track.findUnique({
      where: { id },
    });
  }

  public async createTrack(dto: CreateTrackDto): Promise<Track> {
    const { name, duration, artistId, albumId } = dto;
    return await this.prisma.track.create({
      data: {
        name,
        duration,
        ...(artistId && {
          artist: {
            connect: {
              id: artistId,
            },
          },
        }),
        ...(albumId && {
          album: {
            connect: {
              id: albumId,
            },
          },
        }),
      },
    });
  }

  public async updateTrack(id: UUID, dto: UpdateTrackDto): Promise<Track> {
    return await this.prisma.track.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  public async deleteTrack(id: UUID): Promise<void> {
    await this.prisma.track.delete({
      where: { id },
    });
  }
}

export const trackDb = new TrackDb(new PrismaService);
