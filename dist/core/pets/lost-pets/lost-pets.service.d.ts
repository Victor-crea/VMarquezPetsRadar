import { Repository } from 'typeorm';
import { LostPet } from './lost-pet.entity';
import { CreateLostPetDto } from './dto/create-lost-pet.dto';
import { CacheService } from '../../cache/cache.service';
export declare class LostPetsService {
    private readonly lostPetRepo;
    private readonly cacheService;
    constructor(lostPetRepo: Repository<LostPet>, cacheService: CacheService);
    findAllActive(): Promise<LostPet[]>;
    create(dto: CreateLostPetDto): Promise<LostPet>;
}
