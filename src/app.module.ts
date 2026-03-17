import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { buildTypeormOptions } from './core/db/typeorm.config';
import { PetsModule } from './core/pets/pets.module';
import { MailModule } from './core/mail/mail.module';
import { MapboxModule } from './core/mapbox/mapbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => buildTypeormOptions(config),
    }),
    MailModule,
    MapboxModule,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
