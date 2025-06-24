# Sistema de Infraestructura Tolerante a Fallos 2025

## 🚀 Descripción General

Este proyecto implementa un **sistema de infraestructura tolerante a fallos** desarrollado para entornos Ubuntu, diseñado con arquitectura de microservicios y capacidades de alta disponibilidad. El sistema incluye una aplicación CRUD completa con monitoreo avanzado, métricas en tiempo real y mecanismos de recuperación automática.

## 🏗️ Arquitectura del Sistema

### Componentes Principales

- **API Backend**: Aplicación Express.js con arquitectura MVC
- **Frontend Interactivo**: Interfaz web moderna y responsiva
- **Sistema de Métricas**: Integración con Prometheus para monitoreo
- **Base de Datos**: Almacenamiento persistente con respaldo automático
- **Balanceador de Carga**: Distribución inteligente del tráfico
- **Monitoreo**: Observabilidad completa del sistema

### Características de Tolerancia a Fallos

- ✅ **Circuit Breaker Pattern**: Prevención de cascadas de fallos
- ✅ **Health Checks**: Verificación automática del estado de servicios
- ✅ **Retry Logic**: Reintentos inteligentes con backoff exponencial
- ✅ **Graceful Shutdown**: Cierre controlado de servicios
- ✅ **Error Handling**: Manejo robusto de errores y excepciones
- ✅ **Monitoring & Alerting**: Alertas proactivas del sistema

## 📊 Stack Tecnológico

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **Joi** - Validación de datos robusta
- **Prometheus** - Métricas y monitoreo

### Frontend
- **HTML5/CSS3** - Estructura y estilos modernos
- **JavaScript ES6+** - Lógica interactiva
- **Responsive Design** - Compatible con todos los dispositivos

### DevOps & Infraestructura
- **Ubuntu Server** - Sistema operativo base
- **PM2** - Gestor de procesos con clustering
- **Nginx** - Proxy reverso y balanceador de carga
- **Docker** - Contenedorización (opcional)

## 🛠️ Instalación y Configuración

### Prerrequisitos (Ubuntu)

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js y npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Instalar Nginx (opcional para producción)
sudo apt install nginx -y
```

### Instalación del Proyecto

```bash
# Clonar el repositorio
git clone <repository-url>
cd Infraestructura_2025

# Instalar dependencias del backend
cd app_crud
npm install

# Instalar dependencias de la aplicación principal
cd app
npm install
```

### Configuración de Variables de Entorno

```bash
# Crear archivo .env
cat > .env << EOF
NODE_ENV=production
PORT=3000
API_PORT=3001
DB_CONNECTION=memory
PROMETHEUS_PORT=9090
HEALTH_CHECK_INTERVAL=30000
MAX_RETRIES=3
CIRCUIT_BREAKER_TIMEOUT=60000
EOF
```

## 🚀 Ejecución del Sistema

### Modo Desarrollo

```bash
# Backend API
cd app_crud
npm run dev

# Aplicación principal
cd app
npm run dev
```

### Modo Producción con PM2

```bash
# Configurar PM2 ecosystem
pm2 start ecosystem.config.js

# Guardar configuración PM2
pm2 save
pm2 startup
```

### Configuración de Clustering

```bash
# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'crud-api',
    script: './app_crud/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }, {
    name: 'main-app',
    script: './app_crud/app/index.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
```

## 📈 Monitoreo y Métricas

### Métricas Disponibles

- **Sistema**: CPU, memoria, disco, red
- **Aplicación**: Tiempo de respuesta, throughput, errores
- **Base de Datos**: Conexiones, queries, latencia
- **Negocio**: Operaciones CRUD, usuarios activos

### Endpoints de Salud

- `GET /health` - Estado general del sistema
- `GET /metrics` - Métricas de Prometheus
- `GET /api/status` - Estado detallado de la API

### Dashboard de Monitoreo

```bash
# Acceder a métricas
curl http://localhost:3000/metrics

# Verificar salud del sistema
curl http://localhost:3000/health
```

## 🔧 API Endpoints

### Gestión de Items

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/items` | Listar todos los items |
| GET | `/api/items/:id` | Obtener item por ID |
| POST | `/api/items` | Crear nuevo item |
| PUT | `/api/items/:id` | Actualizar item |
| DELETE | `/api/items/:id` | Eliminar item |

### Ejemplo de Uso

```bash
# Crear un nuevo item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming",
    "description": "Laptop de alto rendimiento",
    "price": 1299.99,
    "category": "electronics",
    "inStock": true,
    "tags": ["gaming", "laptop", "tech"]
  }'
```

## 🔒 Seguridad y Mejores Prácticas

### Implementadas

- ✅ Validación de entrada con Joi
- ✅ Sanitización de datos
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Headers de seguridad
- ✅ Logging de auditoría

### Recomendaciones Adicionales

- Implementar autenticación JWT
- Configurar HTTPS con Let's Encrypt
- Usar helmet.js para headers de seguridad
- Implementar CSP (Content Security Policy)

## 📊 Estructura del Proyecto

```
Infraestructura_2025/
├── app_crud/                 # API principal
│   ├── controllers/          # Controladores MVC
│   ├── models/              # Modelos de datos
│   ├── routes/              # Rutas de la API
│   ├── metrics/             # Métricas Prometheus
│   ├── app/                 # Aplicación frontend
│   │   ├── public/          # Archivos estáticos
│   │   └── index.js         # Servidor principal
│   └── index.js             # Punto de entrada API
├── docs/                    # Documentación
├── tests/                   # Pruebas automatizadas
├── scripts/                 # Scripts de utilidad
└── README.md               # Este archivo
```

## 🧪 Testing

### Ejecución de Pruebas

```bash
# Pruebas unitarias
npm test

# Pruebas de integración
npm run test:integration

# Pruebas de carga
npm run test:load

# Cobertura de código
npm run test:coverage
```

### Pruebas de Tolerancia a Fallos

```bash
# Simular fallo de servicio
pm2 stop crud-api

# Verificar recuperación automática
pm2 logs --follow
```

## 🚀 Despliegue en Producción

### Nginx Configuration

```nginx
upstream app_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name tu-dominio.com;
    
    location / {
        proxy_pass http://app_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /metrics {
        proxy_pass http://127.0.0.1:3000/metrics;
        allow 127.0.0.1;
        deny all;
    }
}
```

### Automatización con Scripts

```bash
#!/bin/bash
# scripts/deploy.sh

echo "🚀 Iniciando despliegue..."

# Actualizar código
git pull origin main

# Instalar dependencias
npm ci --production

# Ejecutar migraciones (si aplica)
npm run migrate

# Reiniciar servicios
pm2 reload ecosystem.config.js

# Verificar salud
sleep 10
curl -f http://localhost:3000/health || exit 1

echo "✅ Despliegue completado exitosamente"
```

## 📞 Soporte y Contribución

### Reporting de Issues

Para reportar problemas o solicitar nuevas características, crear un issue en el repositorio con:

- Descripción detallada del problema
- Pasos para reproducir
- Logs relevantes
- Entorno (versión de Ubuntu, Node.js, etc.)

### Contribuir al Proyecto

1. Fork el repositorio
2. Crear una rama para la característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit los cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🏆 Reconocimientos

- Equipo de desarrollo de infraestructura
- Comunidad de código abierto
- Contribuidores del proyecto

---

**Desarrollado con ❤️ para entornos Ubuntu de alta disponibilidad**

*Última actualización: Junio 2025*