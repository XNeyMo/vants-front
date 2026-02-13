# 🐳 Guía de Docker para Vants Front

Este proyecto está configurado para ejecutarse en Docker con soporte completo para SSR (Server-Side Rendering) de Angular y Tailwind CSS v4.

## 📋 Requisitos Previos

- Docker instalado (versión 20.10 o superior)
- Docker Compose instalado (versión 2.0 o superior)

## 🚀 Inicio Rápido

### Opción 1: Docker Compose (Recomendado)

```bash
# Iniciar la aplicación
npm run docker:up

# Ver logs en tiempo real
npm run docker:logs

# Detener la aplicación
npm run docker:down
```

### Opción 2: Docker CLI

```bash
# Construir la imagen
npm run docker:build

# Ejecutar el contenedor
npm run docker:run
```

O usando comandos de Docker directamente:

```bash
# Construir la imagen
docker build -t vants-front .

# Ejecutar el contenedor
docker run -p 4000:4000 vants-front

# Ejecutar en segundo plano
docker run -d -p 4000:4000 --name vants-front-app vants-front
```

## 🌐 Acceso a la Aplicación

Una vez que el contenedor esté corriendo, la aplicación estará disponible en:

```
http://localhost:4000
```

## 🏗️ Arquitectura del Dockerfile

El Dockerfile usa una construcción multi-stage para optimizar el tamaño de la imagen:

### Stage 1: Build
- Usa `node:20-slim` como base (imagen Debian optimizada)
- Instala todas las dependencias incluyendo devDependencies
- Usa `npm install` para mejor compatibilidad con binarios nativos (lightningcss)
- Compila la aplicación Angular con SSR
- Procesa Tailwind CSS v4 (que usa lightningcss internamente)

### Stage 2: Production
- Copia solo los archivos necesarios del stage de build
- Incluye `node_modules` completos para las dependencias de runtime
- Configura variables de entorno
- Expone el puerto 4000
- Incluye health check para monitoreo

## 🔧 Variables de Entorno

Puedes configurar las siguientes variables de entorno:

| Variable | Valor por Defecto | Descripción |
|----------|-------------------|-------------|
| `NODE_ENV` | `production` | Entorno de Node.js |
| `PORT` | `4000` | Puerto del servidor SSR |

### Usando archivo .env

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Luego edita las variables según tu configuración.

## 📦 Comandos Útiles

### Ver logs del contenedor

```bash
docker logs -f vants-front-app
```

### Acceder al contenedor

```bash
docker exec -it vants-front-app sh
```

### Detener el contenedor

```bash
docker stop vants-front-app
```

### Eliminar el contenedor

```bash
docker rm vants-front-app
```

### Eliminar la imagen

```bash
docker rmi vants-front
```

### Ver estado del contenedor

```bash
docker ps
```

### Ver uso de recursos

```bash
docker stats vants-front-app
```

## 🐛 Troubleshooting

### El build falla

1. Asegúrate de que todas las dependencias estén actualizadas:
   ```bash
   npm install
   ```

2. Limpia el caché de Docker:
   ```bash
   docker builder prune -a
   ```

3. Intenta construir sin caché:
   ```bash
   docker build --no-cache -t vants-front .
   ```

### La aplicación no responde en el puerto 4000

1. Verifica que el puerto no esté en uso:
   ```bash
   netstat -ano | findstr :4000  # Windows
   lsof -i :4000                  # Linux/Mac
   ```

2. Intenta usar un puerto diferente:
   ```bash
   docker run -p 8080:4000 vants-front
   ```

### Error de memoria durante el build

Aumenta la memoria disponible para Docker en la configuración de Docker Desktop.

## 📊 Health Check

El contenedor incluye un health check que verifica cada 30 segundos que la aplicación responda correctamente. Puedes ver el estado con:

```bash
docker inspect --format='{{.State.Health.Status}}' vants-front-app
```

## 🔄 Actualización de la Aplicación

Para actualizar la aplicación en producción:

```bash
# 1. Pull los últimos cambios
git pull

# 2. Reconstruir la imagen
docker-compose build

# 3. Reiniciar los servicios
docker-compose up -d
```

## 🎯 Optimizaciones

- **Multi-stage build**: Reduce el tamaño de la imagen final
- **Debian Slim**: Imagen base optimizada (~80MB) con compatibilidad total para binarios nativos
- **npm install**: Mejor resolución de dependencias nativas como lightningcss
- **Layer caching**: Optimiza rebuilds copiando package.json primero
- **Health checks**: Monitoreo automático de la salud del contenedor
- **Node modules compartidos**: Mantiene solo las dependencias necesarias

## 📝 Notas Adicionales

- El servidor SSR de Angular escucha en el puerto 4000 por defecto
- Tailwind CSS v4 se compila durante el build process usando lightningcss
- **Importante**: Se usa `npm install` en lugar de `npm ci` para asegurar que los binarios nativos de lightningcss se instalen correctamente
- Los archivos estáticos se sirven desde el servidor Express
- El contenedor usa la zona horaria UTC por defecto

### Sobre Tailwind CSS v4 y lightningcss

Tailwind CSS v4 utiliza `lightningcss` internamente, que requiere binarios nativos específicos para la plataforma. Por eso:
- Usamos `node:20-slim` (Debian) en lugar de Alpine Linux
- Usamos `npm install` que resuelve mejor las dependencias opcionales nativas
- El build puede ser un poco más largo, pero garantiza compatibilidad total

## 🔗 Enlaces Útiles

- [Angular SSR Documentation](https://angular.dev/guide/ssr)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
