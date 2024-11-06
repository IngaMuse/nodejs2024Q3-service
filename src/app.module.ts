import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './rotes/user/user.module';
import { ArtistModule } from './rotes/artist/artist.module';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
