# PetRadar (NestJS + PostGIS)

API REST para registrar **mascotas perdidas** y **mascotas encontradas**.  
Al registrar una mascota encontrada, el sistema busca automáticamente mascotas perdidas activas en un **radio de 500m** usando `ST_DWithin(...::geography, 500)` y envía un correo con los detalles y un **mapa estático de Mapbox**.

## Requisitos

- Node.js + npm
- Docker (opcional, recomendado para la base PostGIS)

## Variables de entorno

Copiar `.env.example` a `.env` y completar valores:

- **DB_***: conexión a Postgres/PostGIS
- **SMTP_*** y `MAIL_FROM`: para envío de correo
- **NOTIFY_EMAIL**: si se define, los correos se envían a ese email (genérico) en lugar de a `ownerEmail`
- **MAPBOX_TOKEN**: para generar el mapa estático

## Levantar PostGIS (Docker)

```bash
docker compose up -d
```

## Ejecutar la API

```bash
npm install
npm run start:dev
```

## Endpoints

### Registrar mascota perdida

`POST /lost-pets`

Body ejemplo:

```json
{
  "name": "Luna",
  "species": "gato",
  "breed": "criollo",
  "color": "negro",
  "size": "pequeño",
  "description": "Collar rojo",
  "photoUrl": "https://example.com/luna.jpg",
  "ownerName": "Ana",
  "ownerEmail": "ana@example.com",
  "ownerPhone": "099999999",
  "lat": -0.1807,
  "lng": -78.4678,
  "address": "Cerca del parque",
  "lostDate": "2026-03-15T12:00:00.000Z",
  "isActive": true
}
```

### Registrar mascota encontrada (dispara búsqueda + correo)

`POST /found-pets`

Body ejemplo:

```json
{
  "species": "gato",
  "breed": "criollo",
  "color": "negro",
  "size": "pequeño",
  "description": "Asustado pero bien",
  "finderName": "Carlos",
  "finderEmail": "carlos@example.com",
  "finderPhone": "088888888",
  "lat": -0.1810,
  "lng": -78.4682,
  "address": "Av. principal",
  "foundDate": "2026-03-15T13:00:00.000Z"
}
```
