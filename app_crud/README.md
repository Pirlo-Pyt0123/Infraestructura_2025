# 🚀 CRUD Simple con Node.js

Una API REST super simple para gestionar items.

## 🏃‍♂️ Cómo ejecutar

```bash
npm install
npm start
```

El servidor correrá en: `http://localhost:3000`

## 📝 Endpoints

### Obtener todos los items
```bash
GET http://localhost:3000/items
```

### Obtener un item por ID
```bash
GET http://localhost:3000/items/1
```

### Crear un nuevo item
```bash
POST http://localhost:3000/items
Content-Type: application/json

{
  "name": "Nuevo Producto",
  "price": 99.99,
  "description": "Descripción del producto"
}
```

### Actualizar un item
```bash
PUT http://localhost:3000/items/1
Content-Type: application/json

{
  "name": "Producto Actualizado",
  "price": 149.99
}
```

### Eliminar un item
```bash
DELETE http://localhost:3000/items/1
```

## 🧪 Ejemplos con curl

```bash
# Obtener todos los items
curl http://localhost:3000/items

# Crear un item
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Tablet","price":299.99,"description":"Tablet Android"}'

# Actualizar un item
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"price":899.99}'

# Eliminar un item
curl -X DELETE http://localhost:3000/items/1
```

## 📋 Datos de ejemplo

La API viene con 3 items pre-cargados:
- Laptop ($999.99)
- Mouse ($29.99) 
- Keyboard ($79.99)

¡Listo para usar! 🎉
