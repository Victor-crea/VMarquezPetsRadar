import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
export declare function buildTypeormOptions(config: ConfigService): DataSourceOptions;
