import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostPet } from './lost-pet.entity';
import { LostPetsController } from './lost-pets.controller';
import { LostPetsService } from './lost-pets.service';
import { CacheModule } from '../../cache/cache.module';   // <-- NUEVO

@Module({
  imports: [
    TypeOrmModule.forFeature([LostPet]),
    CacheModule,                                          // <-- NUEVO
  ],
  controllers: [LostPetsController],
  providers: [LostPetsService],
  exports: [TypeOrmModule, LostPetsService],
})
export class LostPetsModule {}