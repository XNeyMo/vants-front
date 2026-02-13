# Guía de Docker

Configuración de Docker para Angular SSR con Tailwind CSS v4.

## Requisitos

- Docker 20.10+
- Docker Compose 2.0+

## Inicio Rápido

```bash
# Con Docker Compose (recomendado)
npm run docker:up
npm run docker:logs
npm run docker:down

# Con Docker CLI
npm run docker:build
npm run docker:run
```

La aplicación estará disponible en `http://localhost:4000`

## Arquitectura

El Dockerfile utiliza construcción multi-stage con `node:20-alpine`:

**Build Stage:**
- Instala herramientas de compilación: `python3`, `make`, `g++` (requeridas para módulos nativos)
- Usa `npm install` para compatibilidad con binarios nativos
- Compila aplicación Angular con SSR
- Procesa Tailwind CSS v4 (requiere lightningcss)

**Production Stage:**
- Copia artifacts del build y node_modules necesarios
- Ejecuta servidor SSR en puerto 4000
- Incluye health check cada 30 segundos

## Problemas Comunes y Soluciones

**Tailwind CSS v4 con lightningcss:**
- Tailwind v4 usa lightningcss que requiere binarios nativos compilados
- Inicialmente se intentó con Alpine sin herramientas de compilación y falló
- Solución: Instalar `python3 make g++` en Alpine para compilar módulos nativos durante npm install
- Usar `npm install` en lugar de `npm ci` para mejor resolución de dependencias opcionales

**Servidor SSR:**
- El servidor Express de Angular se ejecuta con `node dist/vants-front/server/server.mjs`
- Necesita node_modules completos en runtime (no solo production dependencies)
- Por eso se copian todos los node_modules al stage final

## Variables de Entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| NODE_ENV | production | Entorno de ejecución |
| PORT | 4000 | Puerto del servidor |

## Comandos Útiles

```bash
# Logs en tiempo real
docker logs -f vants-front-app

# Acceder al contenedor
docker exec -it vants-front-app sh

# Estado del health check
docker inspect --format='{{.State.Health.Status}}' vants-front-app

# Limpiar caché de Docker
docker builder prune -a

# Reconstruir sin caché
docker build --no-cache -t vants-front .
```

## Actualización

```bash
git pull
docker-compose build
docker-compose up -d
```
