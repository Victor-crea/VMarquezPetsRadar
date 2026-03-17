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
exports.FoundPetsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mail_service_1 = require("../../mail/mail.service");
const mapbox_service_1 = require("../../mapbox/mapbox.service");
const lost_pet_entity_1 = require("../lost-pets/lost-pet.entity");
const found_pet_entity_1 = require("./found-pet.entity");
let FoundPetsService = class FoundPetsService {
    foundPetRepo;
    lostPetRepo;
    mailService;
    mapbox;
    config;
    constructor(foundPetRepo, lostPetRepo, mailService, mapbox, config) {
        this.foundPetRepo = foundPetRepo;
        this.lostPetRepo = lostPetRepo;
        this.mailService = mailService;
        this.mapbox = mapbox;
        this.config = config;
    }
    async create(dto) {
        const foundPet = await this.foundPetRepo.save(this.foundPetRepo.create({
            species: dto.species,
            breed: dto.breed ?? null,
            color: dto.color,
            size: dto.size,
            description: dto.description,
            photoUrl: dto.photoUrl ?? null,
            finderName: dto.finderName,
            finderEmail: dto.finderEmail,
            finderPhone: dto.finderPhone,
            location: { type: 'Point', coordinates: [dto.lng, dto.lat] },
            address: dto.address,
            foundDate: new Date(dto.foundDate),
        }));
        const matches = await this.findActiveLostPetsWithin500m({
            lat: dto.lat,
            lng: dto.lng,
        });
        const notified = [];
        for (const lost of matches) {
            const to = this.config.get('NOTIFY_EMAIL')?.trim() || lost.ownerEmail;
            const mapUrl = this.mapbox.buildStaticMapUrl({
                lostLng: lost.location.coordinates[0],
                lostLat: lost.location.coordinates[1],
                foundLng: dto.lng,
                foundLat: dto.lat,
            });
            const subject = `PetRadar: mascota encontrada cerca (${Math.round(lost.distance)}m)`;
            const html = this.buildNotificationHtml({
                lost,
                foundPet,
                distance: lost.distance,
                mapUrl,
            });
            await this.mailService.sendMail({ to, subject, html });
            notified.push({
                lostPetId: lost.id,
                distance: lost.distance,
                notifiedTo: to,
            });
        }
        return { foundPet, matches: notified };
    }
    async findActiveLostPetsWithin500m(params) {
        const { lat, lng } = params;
        return await this.lostPetRepo
            .createQueryBuilder('lost')
            .addSelect(`ST_Distance(lost.location::geography, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography)`, 'distance')
            .where('lost.isActive = true')
            .andWhere(`ST_DWithin(lost.location::geography, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, 500)`)
            .setParameters({ lat, lng })
            .orderBy('distance', 'ASC')
            .getRawAndEntities()
            .then(({ raw, entities }) => entities.map((e, idx) => ({
            ...e,
            distance: Number(raw[idx]?.distance ?? 0),
        })));
    }
    buildNotificationHtml(params) {
        const { lost, foundPet, distance, mapUrl } = params;
        const foundLng = foundPet.location.coordinates[0];
        const foundLat = foundPet.location.coordinates[1];
        const lostLng = lost.location.coordinates[0];
        const lostLat = lost.location.coordinates[1];
        return `
      <div style="font-family: Arial, sans-serif; line-height: 1.4;">
        <h2>PetRadar: posible coincidencia (${Math.round(distance)}m)</h2>

        <h3>Mascota encontrada</h3>
        <ul>
          <li><b>Especie</b>: ${escapeHtml(foundPet.species)}</li>
          <li><b>Raza</b>: ${escapeHtml(foundPet.breed ?? 'No identificada')}</li>
          <li><b>Color</b>: ${escapeHtml(foundPet.color)}</li>
          <li><b>Tamaño</b>: ${escapeHtml(foundPet.size)}</li>
          <li><b>Descripción</b>: ${escapeHtml(foundPet.description)}</li>
          <li><b>Dirección</b>: ${escapeHtml(foundPet.address)}</li>
          <li><b>Coordenadas</b>: ${foundLat}, ${foundLng}</li>
        </ul>

        <h3>Contacto de quien la encontró</h3>
        <ul>
          <li><b>Nombre</b>: ${escapeHtml(foundPet.finderName)}</li>
          <li><b>Email</b>: ${escapeHtml(foundPet.finderEmail)}</li>
          <li><b>Teléfono</b>: ${escapeHtml(foundPet.finderPhone)}</li>
        </ul>

        <h3>Tu reporte de mascota perdida</h3>
        <ul>
          <li><b>Nombre</b>: ${escapeHtml(lost.name)}</li>
          <li><b>Dirección</b>: ${escapeHtml(lost.address)}</li>
          <li><b>Coordenadas</b>: ${lostLat}, ${lostLng}</li>
        </ul>

        ${mapUrl
            ? `<h3>Mapa (perdida vs encontrada)</h3>
               <img src="${mapUrl}" alt="Mapa" style="max-width: 100%; border: 1px solid #ddd;" />`
            : `<p><i>Mapa no disponible (falta MAPBOX_TOKEN).</i></p>`}
      </div>
    `;
    }
};
exports.FoundPetsService = FoundPetsService;
exports.FoundPetsService = FoundPetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(found_pet_entity_1.FoundPet)),
    __param(1, (0, typeorm_1.InjectRepository)(lost_pet_entity_1.LostPet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService,
        mapbox_service_1.MapboxService,
        config_1.ConfigService])
], FoundPetsService);
function escapeHtml(input) {
    return input
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}
//# sourceMappingURL=found-pets.service.js.map