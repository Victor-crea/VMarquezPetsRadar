import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapboxService {
  constructor(private readonly config: ConfigService) {}

  buildStaticMapUrl(params: {
    lostLng: number;
    lostLat: number;
    foundLng: number;
    foundLat: number;
  }): string | null {
    const token = this.config.get<string>('MAPBOX_TOKEN');
    if (!token) return null;

    const { lostLng, lostLat, foundLng, foundLat } = params;

    // Markers: red = perdido, green = encontrado
    const overlays = [
      `pin-s-l+ff0000(${lostLng},${lostLat})`,
      `pin-s-f+00aa00(${foundLng},${foundLat})`,
    ].join(',');

    // Auto center/zoom via "auto"; 600x400 image
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${overlays}/auto/600x400?access_token=${token}`;
  }
}

