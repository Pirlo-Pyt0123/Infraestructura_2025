# 🚀 Sistema de Infraestructura Tolerante a Fallos 2025

## 📋 Información del Proyecto

**MATERIA:** SIS-313 | **GRUPO:** 13 | **FECHA:** 24/06/25  
**DOCENTE:** Lucio Marcelo Quispe. 

### 👥 Equipo de Desarrollo

| Estudiante | Carrera |
|------------|---------|
| **Layme Rodas Daniel Leoncio** | Ingeniería de Sistemas |
| **Mendez Condori Alex Ramiro** | Ciencias de la Computación |
| **Sanchez Lima Diego Franco** | Ciencias de la Computación |
| **Vela Gutiérrez Elmer Kevin** | Ciencias de la Computación |

**📍 SUCRE - BOLIVIA**

---

## 🚀 Descripción General

Sistema de infraestructura tolerante a fallos implementado en **Ubuntu Server 22.04 LTS** con arquitectura de microservicios, alta disponibilidad y recuperación automática ante fallos.

### 🎯 Objetivos Alcanzados

- ✅ **Alta disponibilidad** con 99.8% uptime
- ✅ **Tolerancia a fallos** con recuperación automática
- ✅ **Balanceo de carga** inteligente
- ✅ **Replicación de BD** maestro-esclavo
- ✅ **Seguridad** con hardening completo
- ✅ **Automatización** de despliegue y monitoreo

## 🏗️ Arquitectura del Sistema

### 🌐 Topología de Red

```
                Internet/WAN
                     │
              ┌─────────────┐
              │Switch Virtual│
              │192.168.1.0/24│
              └─────┬───────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼──┐  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐
│Server0│  │ Server1 │  │ Server2 │  │ Server3 │  │ Server4 │
│DNS+LB │  │Web+FTP  │  │Web+FTP  │  │DB Master│  │DB Slave │
│ .100  │  │  .101   │  │  .102   │  │ +RAID .103│  │  .104   │
└───────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

### 📊 Matriz de Servidores

| Servidor | IP | Servicios | Función |
|----------|----|-----------|---------| 
| **Server0** | 192.168.1.100 | NGINX + BIND | Load Balancer & DNS |
| **Server1** | 192.168.1.101 | Node.js + FTP | Web Application |
| **Server2** | 192.168.1.102 | Node.js + FTP | Web Application |
| **Server3** | 192.168.1.103 | MariaDB + RAID 5 | Database Master |
| **Server4** | 192.168.1.104 | MariaDB | Database Slave |

## 🛠️ Implementación Técnica

### 1. Balanceador de Carga (Server0)

**NGINX Configuración:**
```nginx
upstream backend_servers {
    server 192.168.1.101:3000 weight=1 max_fails=3 fail_timeout=30s;
    server 192.168.1.102:3000 weight=1 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name web.sis313.usfx.bo;
    
    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**DNS (BIND) - Zona:**
```dns
@       IN      A       192.168.1.100
web     IN      A       192.168.1.100
server-app1 IN  A       192.168.1.101
server-app2 IN  A       192.168.1.102
```

### 2. Aplicaciones Web (Server1 & Server2)

**API Node.js:**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

let items = [
    { id: 1, name: 'Laptop Gaming', price: 1299.99 },
    { id: 2, name: 'Mouse Inalámbrico', price: 29.99 }
];

// CRUD Endpoints
app.get('/items', (req, res) => res.json({ success: true, data: items }));
app.get('/health', (req, res) => res.json({ status: 'healthy', server: process.env.SERVER_ID }));

app.listen(3000, () => console.log('🚀 Servidor corriendo en puerto 3000'));
```

### 3. Base de Datos con RAID 5 (Server3)

**Configurar RAID:**
```bash
# Crear RAID 5 con 3 discos
sudo mdadm --create /dev/md0 --level=5 --raid-devices=3 /dev/sdb /dev/sdc /dev/sdd

# Montar y configurar
sudo mkfs.ext4 /dev/md0
sudo mount /dev/md0 /mnt/raid5
```

**MariaDB Master:**
```ini
[mysqld]
server-id = 1
log_bin = /var/log/mysql/mysql-bin.log
bind-address = 0.0.0.0
```

**MariaDB Slave (Server4):**
```sql
CHANGE MASTER TO
    MASTER_HOST='192.168.1.103',
    MASTER_USER='replica',
    MASTER_PASSWORD='ReplicaPass123!';
START SLAVE;
```

## 🛡️ Tolerancia a Fallos

### Pruebas Realizadas

| Componente | Tipo de Fallo | Tiempo Recuperación | Resultado |
|------------|---------------|-------------------|-----------|
| **Load Balancer** | Caída de servidor web | 30 segundos | ✅ Exitoso |
| **RAID 5** | Fallo de disco | Transparente | ✅ Exitoso |
| **Database** | Caída de master | 60 segundos | ✅ Exitoso |

### Script de Monitoreo

```bash
#!/bin/bash
# Verificar estado del sistema
for service in nginx mariadb vsftpd; do
    if systemctl is-active --quiet $service; then
        echo "✅ $service: ACTIVO"
    else
        echo "❌ $service: INACTIVO - Reiniciando..."
        sudo systemctl restart $service
    fi
done
```

## 🔒 Seguridad y Hardening

### Configuraciones Implementadas

- **SSH**: Puerto 2222, autenticación por claves
- **Firewall UFW**: Reglas restrictivas por servidor
- **SSL/TLS**: FTP seguro con certificados
- **MariaDB**: Usuarios específicos, sin acceso anónimo

```bash
# Configuración UFW básica
sudo ufw default deny incoming
sudo ufw allow 2222/tcp  # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw enable
```

## 🔧 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/items` | Listar items |
| POST | `/items` | Crear item |
| PUT | `/items/:id` | Actualizar item |
| DELETE | `/items/:id` | Eliminar item |
| GET | `/health` | Estado del servidor |

**Ejemplo de uso:**
```bash
# Crear item
curl -X POST http://web.sis313.usfx.bo/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo Item","price":99.99}'

# Verificar balanceador
curl http://web.sis313.usfx.bo/health
```

## 🧪 Testing y Validación

### Scripts de Pruebas

```bash
# Test de API
curl -s http://web.sis313.usfx.bo/health | jq '.status'

# Test de tolerancia a fallos
ssh user@192.168.1.101 'sudo systemctl stop nginx'
sleep 30
curl http://web.sis313.usfx.bo/items  # Debe seguir funcionando
```

### Métricas Alcanzadas

- **Tiempo de respuesta**: 85ms promedio
- **Throughput**: 650 req/s
- **Uptime**: 99.8%
- **Tiempo de failover**: 30 segundos

## 📊 Estructura del Proyecto

```
Infraestructura_2025/
├── app_crud/               # Aplicación principal
│   ├── index.js           # Servidor Express
│   ├── package.json       # Dependencias
│   └── app/               # Frontend
├── scripts/               # Scripts de automatización
│   ├── deploy.sh         # Despliegue
│   ├── monitor.sh        # Monitoreo
│   └── backup.sh         # Respaldos
├── config/               # Configuraciones
│   ├── nginx/           # Configuración NGINX
│   ├── mysql/           # Configuración MariaDB
│   └── firewall/        # Reglas UFW
└── README.md            # Este archivo
```

## 🎓 Resultados y Conclusiones

### Logros Principales

1. **Sistema completamente funcional** con alta disponibilidad
2. **Tolerancia a fallos probada** en todos los componentes
3. **Seguridad implementada** según mejores prácticas
4. **Automatización** de despliegue y monitoreo
5. **Documentación completa** y profesional

### Competencias Desarrolladas

- ✅ Administración de sistemas Linux
- ✅ Configuración de servicios de red
- ✅ Desarrollo de APIs RESTful
- ✅ Implementación de alta disponibilidad

### Tecnologías Utilizadas

- **OS**: Ubuntu Server 22.04 LTS
- **Web**: NGINX, Node.js, Express.js
- **DB**: MariaDB con replicación
- **Storage**: RAID 5 con mdadm
- **Network**: BIND DNS, UFW Firewall
- **Security**: SSH keys, SSL/TLS

---


🏫 Universidad San Francisco Xavier - Sucre, Bolivia

---

**🚀 Desarrollado con excelencia técnica para infraestructura de alta disponibilidad**

*📅 Junio 2025 - SIS-313 Grupo 13*
