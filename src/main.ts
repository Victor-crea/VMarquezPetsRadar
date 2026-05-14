// ⚠️ DEBE ser la primera importación, antes que NestJS
import * as appInsights from 'applicationinsights';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Inicializar Application Insights
const connectionString = process.env.APPINSIGHTS_CONNECTION_STRING;
if (connectionString) {
  appInsights
    .setup(connectionString)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)       // HTTP requests
    .setAutoCollectPerformance(true, true)    // CPU, memoria
    .setAutoCollectExceptions(true)     // Errores no capturados
    .setAutoCollectDependencies(true)   // Postgres, Redis, HTTP externos
    .setAutoCollectConsole(true)        // console.log / Logger de Nest
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true)           // Live Metrics en Azure portal
    .start();

  console.log('Application Insights inicializado');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();