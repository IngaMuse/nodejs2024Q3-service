import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { trackDb } from 'src/database/trackDb';
import { UUID } from 'src/types/types';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      return await trackDb.createTrack(createTrackDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Track[]> {
    return await trackDb.getAllTracks();
  }

  async findOne(id: UUID): Promise<Track> {
    const track = await trackDb.getTrackById(id);
    if (!track) throw new NotFoundException();
    return track;
  }

  async update(id: UUID, updateTrackDto: UpdateTrackDto): Promise<Track> {
    await this.findOne(id);
    try {
      return await trackDb.updateTrack(id, updateTrackDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: UUID): Promise<void> {
    const track = await this.findOne(id);
    if (track) await trackDb.deleteTrack(id);
  }
}
