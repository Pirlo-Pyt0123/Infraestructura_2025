# 🚀 CRUD Completo - Frontend + Backend

Una aplicación CRUD completa con un backend en Node.js/Express y un frontend elegante en HTML/CSS/JS.

## 🎯 Características

### 🖥️ Frontend Moderno
- ✨ Diseño elegante y responsive
- 🎨 CSS con gradientes y animaciones
- 📱 Totalmente responsive para móviles
- 🔍 Búsqueda en tiempo real
- 📊 Estadísticas automáticas
- 🍞 Notificaciones toast
- ⌨️ Atajos de teclado
- 🎭 Modal de confirmación para eliminaciones

### 🔧 Backend Robusto
- 📡 API REST completa
- 🔄 CRUD operations (Create, Read, Update, Delete)
- 🛡️ CORS habilitado
- 💾 Base de datos en memoria
- ⚡ Express.js optimizado

## 🏃‍♂️ Cómo ejecutar

### Opción 1: Producción
```bash
cd d:/app_crud/app
npm start
```

### Opción 2: Desarrollo (con auto-reload)
```bash
cd d:/app_crud/app
npm run dev
```

## 🌐 Acceso

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3000/items

## 📱 Estructura del Proyecto

```
app/
├── index.js              # Servidor backend
├── package.json          # Dependencias
├── public/               # Frontend
│   ├── index.html        # Página principal
│   ├── styles.css        # Estilos CSS
│   └── script.js         # JavaScript del frontend
└── node_modules/         # Dependencias instaladas
```

## 🎮 Uso del Frontend

### ➕ Agregar Items
1. Llena el formulario con nombre y precio
2. Haz clic en "Guardar Item"
3. El item aparecerá instantáneamente en la lista

### ✏️ Editar Items
1. Haz clic en el botón "Editar" de cualquier item
2. El formulario se llenará con los datos actuales
3. Modifica lo que necesites
4. Haz clic en "Actualizar Item"

### 🗑️ Eliminar Items
1. Haz clic en el botón "Eliminar"
2. Confirma la eliminación en el modal
3. El item se eliminará permanentemente

### 🔍 Buscar Items
- Usa la barra de búsqueda para filtrar por nombre, ID o precio
- La búsqueda es instantánea

## ⌨️ Atajos de Teclado

- **Ctrl/Cmd + N:** Enfocar el campo de nombre para agregar nuevo item
- **Escape:** Cancelar edición actual
- **Ctrl/Cmd + S:** Guardar item (cuando el formulario está enfocado)

## 🎨 Características Visuales

### 🌈 Colores y Temas
- Gradientes modernos
- Paleta de colores profesional
- Transiciones suaves
- Efectos hover interactivos

### 📱 Responsive Design
- Diseño adaptable a móviles y tablets
- Grid dinámico que se ajusta al tamaño de pantalla
- Botones y formularios optimizados para touch

### 🎭 Animaciones
- Animaciones de entrada suaves
- Efectos de hover en las tarjetas
- Transiciones fluidas entre estados
- Loading spinners elegantes

## 📊 Datos de Ejemplo

La aplicación viene con 3 items pre-cargados:
- 📝 Lápiz - $1.50
- 📔 Cuaderno - $3.20
- 📏 Regla - $0.80

## 🔧 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Página principal (frontend) |
| GET | `/items` | Obtener todos los items |
| POST | `/items` | Crear nuevo item |
| PUT | `/items/:id` | Actualizar item |
| DELETE | `/items/:id` | Eliminar item |

### 📝 Ejemplo de Datos

```json
{
  "id": 1,
  "name": "Laptop",
  "precio": 999.99
}
```

## 🧪 Pruebas con curl

```bash
# Obtener todos los items
curl http://localhost:3000/items

# Crear nuevo item
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","precio":299.99}'

# Actualizar item
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Gamer","precio":1299.99}'

# Eliminar item
curl -X DELETE http://localhost:3000/items/1
```

## 🚀 Próximas Mejoras

- 💾 Integración con base de datos real (MongoDB/MySQL)
- 🔐 Sistema de autenticación
- 📤 Import/Export de datos
- 🔄 Sincronización en tiempo real
- 📈 Dashboard de analytics
- 🌙 Modo oscuro
- 🌍 Internacionalización

## 🐛 Solución de Problemas

### ❌ Error de CORS
Si tienes problemas de CORS, asegúrate de que el backend esté corriendo en el puerto 3000.

### 📡 API no responde
Verifica que el servidor backend esté ejecutándose:
```bash
cd d:/app_crud/app
npm start
```

### 🎨 CSS no se carga
Asegúrate de que la carpeta `public/` contenga todos los archivos estáticos.

---

¡Disfruta tu nueva aplicación CRUD! 🎉✨
