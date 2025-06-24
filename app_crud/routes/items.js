const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// 📋 Get all items with pagination and filtering
router.get('/', itemsController.getAllItems);

// 🔍 Get a specific item by ID
router.get('/:id', itemsController.getItemById);

// ✨ Create a new item
router.post('/', itemsController.createItem);

// 🔄 Update an existing item
router.put('/:id', itemsController.updateItem);

// 🗑️ Delete an item
router.delete('/:id', itemsController.deleteItem);

// 📊 Get items statistics
router.get('/stats/summary', itemsController.getItemsStats);

module.exports = router;
