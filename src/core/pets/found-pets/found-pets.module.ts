import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../../mail/mail.module';
import { MapboxModule } from '../../mapbox/mapbox.module';
import { LostPet } from '../lost-pets/lost-pet.entity';
import { FoundPet } from './found-pet.entity';
import { FoundPetsController } from './found-pets.controller';
import { FoundPetsService } from './found-pets.service';
import { CacheModule } from '../../cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoundPet, LostPet]),
    MailModule,
    MapboxModule,
    CacheModule,
  ],
  controllers: [FoundPetsController],
  providers: [FoundPetsService],
})
export class FoundPetsModule {}

