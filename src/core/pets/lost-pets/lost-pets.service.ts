import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LostPet } from './lost-pet.entity';
import { CreateLostPetDto } from './dto/create-lost-pet.dto';
import { CacheService } from '../../cache/cache.service';

const CACHE_KEY_LOST_PETS = 'lost-pets:active';

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepo: Repository<LostPet>,
    private readonly cacheService: CacheService,   // <-- NUEVO
  ) {}

  // NUEVO
  async findAllActive(): Promise<LostPet[]> {
    try {
      const cached = await this.cacheService.get<LostPet[]>(CACHE_KEY_LOST_PETS);
      if (cached && cached.length > 0) return cached;

      const pets = await this.lostPetRepo.find({ where: { isActive: true } });
      await this.cacheService.set(CACHE_KEY_LOST_PETS, pets);
      return pets;
    } catch {
      return await this.lostPetRepo.find({ where: { isActive: true } });
    }
  }

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
    const saved = await this.lostPetRepo.save(entity);
    await this.cacheService.delete(CACHE_KEY_LOST_PETS);  // <-- NUEVO
    return saved;
  }
}