import { CreateFoundPetDto } from './dto/create-found-pet.dto';
import { FoundPetsService } from './found-pets.service';
export declare class FoundPetsController {
    private readonly foundPetsService;
    constructor(foundPetsService: FoundPetsService);
    create(dto: CreateFoundPetDto): Promise<{
        foundPet: import("./found-pet.entity").FoundPet;
        matches: Array<{
            lostPetId: number;
            distance: number;
            notifiedTo: string;
        }>;
    }>;
}
