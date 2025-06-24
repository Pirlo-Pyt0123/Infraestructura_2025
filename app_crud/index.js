const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());

// Base de datos en memoria (simple)
let items = [
  { id: 1, name: 'Laptop', price: 999.99, description: 'Gaming laptop' },
  { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
  { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard' }
];
let nextId = 4;

// 🏠 Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Simple CRUD API',
    endpoints: {
      'GET /items': 'Obtener todos los items',
      'GET /items/:id': 'Obtener un item por ID',
      'POST /items': 'Crear nuevo item',
      'PUT /items/:id': 'Actualizar item',
      'DELETE /items/:id': 'Eliminar item'
    }
  });
});

// 📋 GET - Obtener todos los items
app.get('/items', (req, res) => {
  res.json({
    success: true,
    data: items,
    total: items.length
  });
});

// 🔍 GET - Obtener item por ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item no encontrado'
    });
  }
  
  res.json({
    success: true,
    data: item
  });
});

// ✨ POST - Crear nuevo item
app.post('/items', (req, res) => {
  const { name, price, description } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Name y price son requeridos'
    });
  }
  
  const newItem = {
    id: nextId++,
    name,
    price: parseFloat(price),
    description: description || ''
  };
  
  items.push(newItem);
  
  res.status(201).json({
    success: true,
    message: 'Item creado exitosamente',
    data: newItem
  });
});

// 🔄 PUT - Actualizar item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item no encontrado'
    });
  }
  
  const { name, price, description } = req.body;
  
  if (name) items[itemIndex].name = name;
  if (price) items[itemIndex].price = parseFloat(price);
  if (description !== undefined) items[itemIndex].description = description;
  
  res.json({
    success: true,
    message: 'Item actualizado exitosamente',
    data: items[itemIndex]
  });
});

// 🗑️ DELETE - Eliminar item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item no encontrado'
    });
  }
  
  const deletedItem = items.splice(itemIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Item eliminado exitosamente',
    data: deletedItem
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
🎉 ¡Servidor CRUD Simple funcionando!
🚀 Puerto: ${PORT}
📝 Endpoints disponibles:
   GET    http://localhost:${PORT}/items
   POST   http://localhost:${PORT}/items
   GET    http://localhost:${PORT}/items/:id
   PUT    http://localhost:${PORT}/items/:id
   DELETE http://localhost:${PORT}/items/:id
  `);
});

module.exports = app;
