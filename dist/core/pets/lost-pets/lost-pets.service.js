"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostPetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lost_pet_entity_1 = require("./lost-pet.entity");
let LostPetsService = class LostPetsService {
    lostPetRepo;
    constructor(lostPetRepo) {
        this.lostPetRepo = lostPetRepo;
    }
    async create(dto) {
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
};
exports.LostPetsService = LostPetsService;
exports.LostPetsService = LostPetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lost_pet_entity_1.LostPet)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LostPetsService);
//# sourceMappingURL=lost-pets.service.js.map