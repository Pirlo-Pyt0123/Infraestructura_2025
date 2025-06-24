class Item {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description || '';
    this.price = data.price || 0;
    this.category = data.category || 'general';
    this.inStock = data.inStock !== undefined ? data.inStock : true;
    this.tags = data.tags || [];
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Convert to JSON for API responses
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      inStock: this.inStock,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// In-memory storage (in production, use a real database)
class ItemModel {
  constructor() {
    this.items = new Map();
    this.currentId = 1;
    
    // Seed with some sample data
    this.seedData();
  }

  // Initialize with sample data
  seedData() {
    const sampleItems = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality noise-canceling wireless headphones',
        price: 199.99,
        category: 'electronics',
        inStock: true,
        tags: ['audio', 'wireless', 'premium']
      },
      {
        name: 'Coffee Beans - Premium Blend',
        description: 'Artisan roasted coffee beans with rich flavor',
        price: 24.99,
        category: 'food',
        inStock: true,
        tags: ['coffee', 'organic', 'premium']
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Comfortable office chair with lumbar support',
        price: 299.99,
        category: 'furniture',
        inStock: false,
        tags: ['office', 'ergonomic', 'furniture']
      },
      {
        name: 'Smartphone Case',
        description: 'Protective case for latest smartphone models',
        price: 19.99,
        category: 'accessories',
        inStock: true,
        tags: ['phone', 'protection', 'accessories']
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes for athletes',
        price: 129.99,
        category: 'sports',
        inStock: true,
        tags: ['shoes', 'running', 'athletics']
      }
    ];

    sampleItems.forEach(item => this.create(item));
  }

  // Create a new item
  create(data) {
    const item = new Item({
      ...data,
      id: this.currentId++
    });
    
    this.items.set(item.id, item);
    return item.toJSON();
  }

  // Find all items with filtering, pagination, and sorting
  findAll(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options;

    let itemsList = Array.from(this.items.values());

    // Apply filters
    if (filters.category) {
      itemsList = itemsList.filter(item => 
        item.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.inStock !== undefined) {
      itemsList = itemsList.filter(item => item.inStock === filters.inStock);
    }

    if (filters.minPrice) {
      itemsList = itemsList.filter(item => item.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      itemsList = itemsList.filter(item => item.price <= filters.maxPrice);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      itemsList = itemsList.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort items
    itemsList.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    // Apply pagination
    const total = itemsList.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = itemsList.slice(startIndex, endIndex);

    return {
      items: paginatedItems.map(item => item.toJSON()),
      total,
      page,
      limit,
      totalPages
    };
  }

  // Find item by ID
  findById(id) {
    const item = this.items.get(id);
    return item ? item.toJSON() : null;
  }

  // Update an item
  update(id, data) {
    const item = this.items.get(id);
    if (!item) return null;

    // Update fields
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        item[key] = data[key];
      }
    });

    item.updatedAt = new Date().toISOString();
    
    this.items.set(id, item);
    return item.toJSON();
  }

  // Delete an item
  delete(id) {
    const exists = this.items.has(id);
    if (exists) {
      this.items.delete(id);
    }
    return exists;
  }

  // Get statistics
  getStats() {
    const itemsList = Array.from(this.items.values());
    const total = itemsList.length;
    const inStock = itemsList.filter(item => item.inStock).length;
    const outOfStock = total - inStock;
    
    const categories = {};
    const avgPrice = itemsList.length > 0 
      ? itemsList.reduce((sum, item) => sum + item.price, 0) / itemsList.length 
      : 0;

    itemsList.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });

    const priceRange = itemsList.length > 0 ? {
      min: Math.min(...itemsList.map(item => item.price)),
      max: Math.max(...itemsList.map(item => item.price))
    } : { min: 0, max: 0 };

    return {
      total,
      inStock,
      outOfStock,
      categories,
      avgPrice: Math.round(avgPrice * 100) / 100,
      priceRange
    };
  }

  // Clear all items (for testing)
  clear() {
    this.items.clear();
    this.currentId = 1;
  }
}

// Export a singleton instance
module.exports = new ItemModel();
