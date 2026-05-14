import { CreateLostPetDto } from './dto/create-lost-pet.dto';
import { LostPetsService } from './lost-pets.service';
export declare class LostPetsController {
    private readonly lostPetsService;
    constructor(lostPetsService: LostPetsService);
    findAll(): Promise<import("./lost-pet.entity").LostPet[]>;
    create(dto: CreateLostPetDto): Promise<import("./lost-pet.entity").LostPet>;
}
