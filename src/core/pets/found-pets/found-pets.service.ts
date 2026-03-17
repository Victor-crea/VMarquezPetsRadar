import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../../mail/mail.service';
import { MapboxService } from '../../mapbox/mapbox.service';
import { LostPet } from '../lost-pets/lost-pet.entity';
import { FoundPet } from './found-pet.entity';
import { CreateFoundPetDto } from './dto/create-found-pet.dto';

type LostPetMatch = LostPet & { distance: number };

@Injectable()
export class FoundPetsService {
  constructor(
    @InjectRepository(FoundPet)
    private readonly foundPetRepo: Repository<FoundPet>,
    @InjectRepository(LostPet)
    private readonly lostPetRepo: Repository<LostPet>,
    private readonly mailService: MailService,
    private readonly mapbox: MapboxService,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateFoundPetDto): Promise<{
    foundPet: FoundPet;
    matches: Array<{ lostPetId: number; distance: number; notifiedTo: string }>;
  }> {
    const foundPet = await this.foundPetRepo.save(
      this.foundPetRepo.create({
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
      }),
    );

    const matches = await this.findActiveLostPetsWithin500m({
      lat: dto.lat,
      lng: dto.lng,
    });

    const notified: Array<{
      lostPetId: number;
      distance: number;
      notifiedTo: string;
    }> = [];
    for (const lost of matches) {
      const to =
        this.config.get<string>('NOTIFY_EMAIL')?.trim() || lost.ownerEmail;

      const mapUrl = this.mapbox.buildStaticMapUrl({
        lostLng: lost.location.coordinates[0],
        lostLat: lost.location.coordinates[1],
        foundLng: dto.lng,
        foundLat: dto.lat,
      });

      const subject = `PetRadar: mascota encontrada cerca (${Math.round(
        lost.distance,
      )}m)`;

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

  async findActiveLostPetsWithin500m(params: {
    lat: number;
    lng: number;
  }): Promise<LostPetMatch[]> {
    const { lat, lng } = params;

    // Nota: cast a ::geography obligatorio para distancia en metros
    return await this.lostPetRepo
      .createQueryBuilder('lost')
      .addSelect(
        `ST_Distance(lost.location::geography, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography)`,
        'distance',
      )
      .where('lost.isActive = true')
      .andWhere(
        `ST_DWithin(lost.location::geography, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, 500)`,
      )
      .setParameters({ lat, lng })
      .orderBy('distance', 'ASC')
      .getRawAndEntities()
      .then(({ raw, entities }) =>
        entities.map((e, idx) => ({
          ...e,
          distance: Number(raw[idx]?.distance ?? 0),
        })),
      );
  }

  private buildNotificationHtml(params: {
    lost: LostPet;
    foundPet: FoundPet;
    distance: number;
    mapUrl: string | null;
  }): string {
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

        ${
          mapUrl
            ? `<h3>Mapa (perdida vs encontrada)</h3>
               <img src="${mapUrl}" alt="Mapa" style="max-width: 100%; border: 1px solid #ddd;" />`
            : `<p><i>Mapa no disponible (falta MAPBOX_TOKEN).</i></p>`
        }
      </div>
    `;
  }
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

