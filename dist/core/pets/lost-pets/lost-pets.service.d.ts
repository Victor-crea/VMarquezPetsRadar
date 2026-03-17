import { Repository } from 'typeorm';
import { LostPet } from './lost-pet.entity';
import { CreateLostPetDto } from './dto/create-lost-pet.dto';
export declare class LostPetsService {
    private readonly lostPetRepo;
    constructor(lostPetRepo: Repository<LostPet>);
    create(dto: CreateLostPetDto): Promise<LostPet>;
}
