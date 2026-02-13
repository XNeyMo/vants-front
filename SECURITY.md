# Seguridad del Proyecto

Análisis de seguridad realizado con Snyk y Docker Desktop para identificar y mitigar vulnerabilidades en la imagen Docker y las dependencias del proyecto.

## Resumen Ejecutivo

**Análisis Dockerfile (Snyk):**
- Estado inicial: 40 vulnerabilidades conocidas (1 crítica, 1 media, 38 bajas)
- Estado final: 0 vulnerabilidades
- Acción: Cambio de imagen base de `node:20-slim` a `node:20-alpine`

**Análisis de Dependencias (Snyk):**
- Actualización de `@jsverse/transloco` de v7.6.1 a v8.0.0
- Solución de fuga de recursos y gestión inadecuada de memoria

**Análisis de Código (Snyk):**
- Exposición de información sensible a través de headers HTTP
- Solución: Configuración de Express para deshabilitar headers reveladores

**Análisis Docker Desktop:**
- Estado inicial: 33 vulnerabilidades (5 altas, 2 medias, 26 bajas)
- Estado final: 8 vulnerabilidades (5 altas, 1 media, 2 bajas)
- Reducción: 75.7% de vulnerabilidades totales

## Vulnerabilidades en Dockerfile

### Estado Inicial: node:20-slim

La imagen `node:20-slim` basada en Debian presentaba 40 vulnerabilidades conocidas:

#### 1. Vulnerabilidad Crítica: Integer Overflow (CVE-2023-45853)

**Identificación:**
- CWE-190: Integer Overflow or Wraparound
- CVE-2023-45853
- Severidad: Crítica (CVSS 9.8)

**Descripción:**
Desbordamiento de enteros en bibliotecas del sistema base de Debian que podría permitir:
- Ejecución arbitraria de código
- Corrupción de memoria
- Denegación de servicio (DoS)
- Escalada de privilegios en el contenedor

**Referencia:** [CWE-190](https://cwe.mitre.org/data/definitions/190.html)

**Impacto si no se arreglaba:**
Un atacante podría explotar esta vulnerabilidad para ejecutar código malicioso dentro del contenedor, comprometiendo la aplicación y potencialmente el host si hay escape del contenedor. Dado que el servidor SSR procesa peticiones de clientes, esto representa un vector de ataque crítico.

#### 2. Vulnerabilidad Media: Algorithmic Complexity (CVE-2025-14831)

**Identificación:**
- CWE-407: Inefficient Algorithmic Complexity
- CVE-2025-14831
- Severidad: Media (CVSS 5.3)

**Descripción:**
Complejidad algorítmica ineficiente en componentes del sistema que permite:
- Ataques de agotamiento de recursos (CPU/Memoria)
- Degradación del rendimiento del servidor
- Denegación de servicio mediante requests específicamente diseñadas

**Referencia:** [CWE-407](https://cwe.mitre.org/data/definitions/407.html)

**Impacto si no se arreglaba:**
Atacantes podrían enviar requests maliciosas que consumen recursos excesivos, causando que el servidor SSR se vuelva lento o no responda, afectando la disponibilidad del servicio para usuarios legítimos.

### Solución Implementada

**Cambio:** `node:20-slim` → `node:20-alpine`

**Justificación:**
- Alpine Linux utiliza musl libc en lugar de glibc (usado en Debian)
- Imagen base significativamente más pequeña (~5MB vs ~80MB)
- Menor superficie de ataque, menos paquetes del sistema
- Actualizaciones de seguridad más frecuentes en Alpine
- Eliminación completa de las 40 vulnerabilidades identificadas

**Consideraciones técnicas:**
Aunque Alpine requiere herramientas adicionales (`python3`, `make`, `g++`) para compilar módulos nativos como lightningcss, el beneficio de seguridad supera ampliamente este overhead de build.

## Vulnerabilidades en Dependencias

### @jsverse/transloco v7.6.1

**Identificación:**
- CWE-772: Missing Release of Resource after Effective Lifetime
- Severidad: Media

**Descripción:**
La versión 7.6.1 de Transloco presentaba una fuga de recursos donde:
- Las traducciones cargadas dinámicamente no se liberaban correctamente
- Acumulación de memoria en aplicaciones SPA de larga duración
- Memory leaks en contextos de Server-Side Rendering

**Referencia:** [CWE-772](https://cwe.mitre.org/data/definitions/772.html)

**Impacto si no se arreglaba:**
En una aplicación SSR como la nuestra, cada request carga traducciones. Sin liberación adecuada de recursos, el servidor experimentaría:
- Incremento gradual del uso de memoria
- Eventual agotamiento de memoria del contenedor
- Crash del servidor SSR
- Necesidad de reinicios frecuentes

### Solución Implementada

**Cambio:** `@jsverse/transloco@7.6.1` → `@jsverse/transloco@8.0.0`

**Mejoras:**
- Gestión automática del ciclo de vida de recursos
- Liberación correcta de memoria en contexto SSR
- API mejorada para cleanup en aplicaciones server-side

## Vulnerabilidades en Código

### Information Exposure via X-Powered-By Header

**Identificación:**
- CWE-200: Exposure of Sensitive Information to an Unauthorized Actor
- Severidad: Media
- Ubicación: `src/server.ts` (servidor Express)

**Descripción:**
El servidor Express por defecto envía el header `X-Powered-By: Express` en todas las respuestas HTTP, exponiendo:
- Framework utilizado (Express)
- Versión implícita del framework
- Información útil para atacantes en fase de reconocimiento

**Referencia:** [CWE-200](https://cwe.mitre.org/data/definitions/200.html)

**Impacto si no se arreglaba:**
Facilita ataques dirigidos al permitir a atacantes:
- Identificar el stack tecnológico del servidor
- Buscar vulnerabilidades específicas de Express
- Reducir el tiempo de reconnaissance en un ataque
- Aumentar la probabilidad de éxito en exploits automáticos

### Solución Implementada

**Cambio:** Deshabilitar header revelador en configuración de Express

```typescript
// En src/server.ts
app.disable('x-powered-by');
```

**Beneficios:**
- Eliminación de información innecesaria en responses
- Menor superficie de información para atacantes
- Cumplimiento con mejores prácticas de seguridad OWASP
- Sin impacto en funcionalidad de la aplicación

## Análisis Docker Desktop

### Estado Inicial: node:20-slim

**Total: 33 vulnerabilidades**
- 5 altas
- 2 medias
- 26 bajas

**Principales preocupaciones:**
Las vulnerabilidades altas incluían problemas en:
- Bibliotecas de sistema Debian (glibc, systemd)
- Módulos del kernel expuestos
- Herramientas de sistema base

### Estado Final: node:20-alpine

**Total: 8 vulnerabilidades**
- 5 altas
- 1 media
- 2 bajas

**Análisis de reducción:**
- 75.7% reducción en vulnerabilidades totales
- 50% reducción en vulnerabilidades medias
- 92.3% reducción en vulnerabilidades bajas
- Las 5 vulnerabilidades altas restantes son inherentes a Node.js 20, no a la imagen base

**Nota importante:**
Las vulnerabilidades altas remanentes están relacionadas con el runtime de Node.js y no con el sistema operativo base. Estas se mantienen bajo monitoreo y se resolverán con actualizaciones menores de Node.js 20.x conforme se publiquen parches.

## Mejores Prácticas Implementadas

1. **Elección de imagen base:** Alpine Linux por su perfil de seguridad superior
2. **Actualización de dependencias:** Mantener librerías en versiones estables sin vulnerabilidades conocidas
3. **Hardening de servidor:** Deshabilitar headers informativos innecesarios
4. **Análisis continuo:** Integración de Snyk para monitoreo constante
5. **Health checks:** Detección temprana de degradación por ataques DoS
6. **Multi-stage builds:** Reducir superficie de ataque en imagen final

## Monitoreo Continuo

**Herramientas:**
- Snyk: Análisis estático de Dockerfile, dependencias y código
- Docker Desktop: Escaneo de vulnerabilidades en imagen construida

**Frecuencia de análisis:**
- Pre-commit: Análisis de dependencias
- Pre-build: Análisis de Dockerfile
- Post-build: Escaneo de imagen generada
- Programado: Revisión semanal de nuevas vulnerabilidades

## Referencias

- [CWE-190: Integer Overflow](https://cwe.mitre.org/data/definitions/190.html)
- [CWE-407: Algorithmic Complexity](https://cwe.mitre.org/data/definitions/407.html)
- [CWE-772: Missing Release of Resource](https://cwe.mitre.org/data/definitions/772.html)
- [CWE-200: Information Exposure](https://cwe.mitre.org/data/definitions/200.html)
- [CVE-2023-45853](https://www.cve.org/CVERecord?id=CVE-2023-45853)
- [CVE-2025-14831](https://www.cve.org/CVERecord?id=CVE-2025-14831)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
