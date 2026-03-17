import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LostPet } from './lost-pet.entity';
import { CreateLostPetDto } from './dto/create-lost-pet.dto';

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepo: Repository<LostPet>,
  ) {}

  async create(dto: CreateLostPetDto): Promise<LostPet> {
    const entity = this.lostPetRepo.create({
      name: dto.name,
      species: dto.species,
      breed: dto.breed,
      color: dto.color,
      size: dto.size,
      description: dto.description,
      photoUrl: dto.photoUrl ?? null,
      ownerName: dto.ownerName,
      ownerEmail: dto.ownerEmail,
      ownerPhone: dto.ownerPhone,
      location: { type: 'Point', coordinates: [dto.lng, dto.lat] },
      address: dto.address,
      lostDate: new Date(dto.lostDate),
      isActive: dto.isActive ?? true,
    });
    return await this.lostPetRepo.save(entity);
  }
}

