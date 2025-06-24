const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");





app.use(cors());
app.use(express.json());

// 🎨 Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 🔸 Simulación de "base de datos" en memoria
let items = [
  { id: 1, name: "Lápiz", precio: 1.5 },
  { id: 2, name: "Cuaderno", precio: 3.2 },
  { id: 3, name: "Regla", precio: 0.8 }
];

// 🔹 Función auxiliar para generar ID único
let nextId = 4;
function generateId() {
  return nextId++;
}

// 🏠 Ruta principal - servir el HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 📥 Obtener todos los items
app.get("/items", (req, res) => res.json(items));


// ➕ Agregar un nuevo item
app.post("/items", (req, res) => {
  const item = {
    id: generateId(),
    name: req.body.name,
    precio: req.body.precio || 0
  };
  items.push(item);
  res.status(201).json(item);
});


// 📝 Actualizar un item
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items[index] = { id, ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).send("Item no encontrado");
  }
});


// ❌ Eliminar un item
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const countBefore = items.length;
  items = items.filter(i => i.id !== id);
  if (items.length < countBefore) {
    res.status(204).send();
  } else {
    res.status(404).send("Item no encontrado");
  }
});

// 🚀 Iniciar servidor
app.listen(3000, '0.0.0.0', () => {
  console.log("🎉 Servidor CRUD corriendo!");
  console.log("🌐 Frontend: http://localhost:3000");
  console.log("📡 API: http://localhost:3000/items");
});
