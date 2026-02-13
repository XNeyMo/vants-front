# ===============================
# 1️⃣ Build Stage
# ===============================
FROM node:20-alpine AS build

# Instalar dependencias del sistema necesarias para compilar módulos nativos
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json ./

# Instalar todas las dependencias usando npm install (más flexible para binarios nativos)
RUN npm install

# Copiar el código fuente
COPY . .

# Build del proyecto Angular con SSR
RUN npm run build

# ===============================
# 2️⃣ Production Stage
# ===============================
FROM node:20-alpine

WORKDIR /app

# Copiar los archivos buildados
COPY --from=build /app/dist ./dist

# Copiar package files y node_modules necesarios
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=4000

# Exponer el puerto
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Ejecutar el servidor SSR
CMD ["node", "dist/vants-front/server/server.mjs"]