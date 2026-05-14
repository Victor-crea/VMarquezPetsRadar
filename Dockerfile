FROM node:20-alpine AS builder

WORKDIR /app

# Instalar CLI globalmente para evitar colisión de cache entre stages
RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm ci --include=dev

COPY src ./src
COPY nest-cli.json tsconfig.json tsconfig.build.json ./

RUN nest build

# ------------------------------------

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]