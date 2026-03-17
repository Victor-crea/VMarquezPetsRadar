import { ConfigService } from '@nestjs/config';
export declare class MapboxService {
    private readonly config;
    constructor(config: ConfigService);
    buildStaticMapUrl(params: {
        lostLng: number;
        lostLat: number;
        foundLng: number;
        foundLat: number;
    }): string | null;
}
