import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { MailService } from '../../mail/mail.service';
import { MapboxService } from '../../mapbox/mapbox.service';
import { LostPet } from '../lost-pets/lost-pet.entity';
import { FoundPet } from './found-pet.entity';
import { CreateFoundPetDto } from './dto/create-found-pet.dto';
import { CacheService } from '../../cache/cache.service';
type LostPetMatch = LostPet & {
    distance: number;
};
export declare class FoundPetsService {
    private readonly foundPetRepo;
    private readonly lostPetRepo;
    private readonly mailService;
    private readonly mapbox;
    private readonly config;
    private readonly cacheService;
    constructor(foundPetRepo: Repository<FoundPet>, lostPetRepo: Repository<LostPet>, mailService: MailService, mapbox: MapboxService, config: ConfigService, cacheService: CacheService);
    findAll(): Promise<FoundPet[]>;
    create(dto: CreateFoundPetDto): Promise<{
        foundPet: FoundPet;
        matches: Array<{
            lostPetId: number;
            distance: number;
            notifiedTo: string;
        }>;
    }>;
    findActiveLostPetsWithin500m(params: {
        lat: number;
        lng: number;
    }): Promise<LostPetMatch[]>;
    private buildNotificationHtml;
}
export {};
