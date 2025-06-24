const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'crud-app',
  version: '1.0.0'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Create custom metrics

// Counter for total number of items
const itemsTotal = new client.Gauge({
  name: 'items_total',
  help: 'Total number of items in the system',
  registers: [register]
});

// Counter for operations on items
const itemOperations = new client.Counter({
  name: 'item_operations_total',
  help: 'Total number of operations performed on items',
  labelNames: ['operation'], // create, read, update, delete
  registers: [register]
});

// Histogram for HTTP request duration
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  registers: [register]
});

// Counter for HTTP requests
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Gauge for current active connections
const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register]
});

// Gauge for memory usage
const memoryUsage = new client.Gauge({
  name: 'nodejs_memory_usage_bytes',
  help: 'Memory usage in bytes',
  labelNames: ['type'],
  registers: [register]
});

// Update memory usage metrics every 10 seconds
setInterval(() => {
  const usage = process.memoryUsage();
  memoryUsage.set({ type: 'rss' }, usage.rss);
  memoryUsage.set({ type: 'heapUsed' }, usage.heapUsed);
  memoryUsage.set({ type: 'heapTotal' }, usage.heapTotal);
  memoryUsage.set({ type: 'external' }, usage.external);
}, 10000);

// Application-specific metrics
const apiResponseTime = new client.Histogram({
  name: 'api_response_time_seconds',
  help: 'API response time in seconds',
  labelNames: ['endpoint', 'method'],
  buckets: [0.001, 0.01, 0.1, 0.5, 1, 2, 5],
  registers: [register]
});

const databaseOperations = new client.Counter({
  name: 'database_operations_total',
  help: 'Total number of database operations',
  labelNames: ['operation', 'status'],
  registers: [register]
});

// Error tracking
const applicationErrors = new client.Counter({
  name: 'application_errors_total',
  help: 'Total number of application errors',
  labelNames: ['type', 'endpoint'],
  registers: [register]
});

// Initialize items total gauge with current count
const ItemModel = require('../models/items');
const stats = ItemModel.getStats();
itemsTotal.set(stats.total);

module.exports = {
  register,
  itemsTotal,
  itemOperations,
  httpRequestDuration,
  httpRequestsTotal,
  activeConnections,
  memoryUsage,
  apiResponseTime,
  databaseOperations,
  applicationErrors
};
