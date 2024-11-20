import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { ArtistModule } from './routes/artist/artist.module';
import { AlbumModule } from './routes/album/album.module';
import { TrackModule } from './routes/track/track.module';
import { FavsModule } from './routes/favs/favs.module';
import { PrismaModule } from './routes/prisma/prisma.module';
import { LoggingModule } from './logging/logging.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CatchEverythingFilter } from './filter/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    PrismaModule,
    LoggingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
