import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { LostPet } from '../pets/lost-pets/lost-pet.entity';
import { FoundPet } from '../pets/found-pets/found-pet.entity';

export function buildTypeormOptions(
  config: ConfigService,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST', 'localhost'),
    port: config.get<number>('DB_PORT', 5432),
    username: config.get<string>('DB_USERNAME', 'postgres'),
    password: config.get<string>('DB_PASSWORD', 'postgres'),
    database: config.get<string>('DB_NAME', 'petradar'),
    entities: [LostPet, FoundPet],
    synchronize: true,
    logging: config.get<string>('NODE_ENV') !== 'production',
  };
}

