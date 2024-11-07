import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { trackDb } from 'src/database/trackDb';
import { UUID } from 'src/types/types';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    return trackDb.createTrack(createTrackDto);
  }

  findAll(): Track[] {
    return trackDb.getAllTracks();
  }

  findOne(id: UUID): Track {
    const track = trackDb.getTrackById(id);
    if (!track) throw new NotFoundException();
    return track;
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto): Track {
    this.findOne(id);
    return trackDb.updateTrack(id, updateTrackDto);
  }

  remove(id: UUID) {
    const track = this.findOne(id);
    if (track) trackDb.deleteTrack(id);
  }
}
