const Joi = require('joi');
const Item = require('../models/items');
const { itemsTotal, itemOperations } = require('../metrics/prometheus');

// Validation schemas
const itemSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().positive().precision(2).optional(),
  category: Joi.string().max(50).optional(),
  inStock: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string().max(30)).max(10).optional()
});

const updateItemSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().positive().precision(2).optional(),
  category: Joi.string().max(50).optional(),
  inStock: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string().max(30)).max(10).optional()
});

class ItemsController {
  
  // 📋 Get all items with pagination, filtering, and sorting
  async getAllItems(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        inStock,
        minPrice,
        maxPrice,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      const filters = {};
      
      if (category) filters.category = category;
      if (inStock !== undefined) filters.inStock = inStock === 'true';
      if (minPrice) filters.minPrice = parseFloat(minPrice);
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
      if (search) filters.search = search;

      const options = {
        page: parseInt(page),
        limit: Math.min(parseInt(limit), 50), // Max 50 items per page
        sortBy,
        sortOrder
      };

      const result = Item.findAll(filters, options);
      
      itemOperations.labels('read').inc();
      
      res.json({
        success: true,
        data: result.items,
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalItems: result.total,
          itemsPerPage: result.limit,
          hasNextPage: result.page < result.totalPages,
          hasPrevPage: result.page > 1
        },
        filters: filters
      });
    } catch (error) {
      console.error('Error getting items:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve items',
        message: error.message
      });
    }
  }

  // 🔍 Get item by ID
  async getItemById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid item ID',
          message: 'Item ID must be a valid number'
        });
      }

      const item = Item.findById(parseInt(id));
      
      if (!item) {
        return res.status(404).json({
          success: false,
          error: 'Item not found',
          message: `Item with ID ${id} does not exist`
        });
      }

      itemOperations.labels('read').inc();

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      console.error('Error getting item:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve item',
        message: error.message
      });
    }
  }

  // ✨ Create new item
  async createItem(req, res) {
    try {
      const { error, value } = itemSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        });
      }

      const newItem = Item.create(value);
      
      itemsTotal.inc();
      itemOperations.labels('create').inc();

      res.status(201).json({
        success: true,
        message: 'Item created successfully',
        data: newItem
      });
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create item',
        message: error.message
      });
    }
  }

  // 🔄 Update item
  async updateItem(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid item ID',
          message: 'Item ID must be a valid number'
        });
      }

      const { error, value } = updateItemSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        });
      }

      const updatedItem = Item.update(parseInt(id), value);
      
      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          error: 'Item not found',
          message: `Item with ID ${id} does not exist`
        });
      }

      itemOperations.labels('update').inc();

      res.json({
        success: true,
        message: 'Item updated successfully',
        data: updatedItem
      });
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update item',
        message: error.message
      });
    }
  }

  // 🗑️ Delete item
  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid item ID',
          message: 'Item ID must be a valid number'
        });
      }

      const deleted = Item.delete(parseInt(id));
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Item not found',
          message: `Item with ID ${id} does not exist`
        });
      }

      itemsTotal.dec();
      itemOperations.labels('delete').inc();

      res.json({
        success: true,
        message: 'Item deleted successfully',
        data: { id: parseInt(id) }
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete item',
        message: error.message
      });
    }
  }

  // 📊 Get items statistics
  async getItemsStats(req, res) {
    try {
      const stats = Item.getStats();
      
      res.json({
        success: true,
        data: {
          ...stats,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error getting stats:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve statistics',
        message: error.message
      });
    }
  }
}

module.exports = new ItemsController();
