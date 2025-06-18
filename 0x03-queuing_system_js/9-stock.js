// 9-stock.js

import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

// Product list
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

// Redis setup
const client = createClient();
client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));
client.on('connect', () => console.log('Redis client connected to the server'));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Utility
function getItemById(id) {
  return listProducts.find((item) => item.itemId === id);
}

async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock !== null ? parseInt(stock, 10) : null;
}

// Express app
const app = express();
const port = 1245;

// Routes
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const reserved = await getCurrentReservedStockById(itemId);
  const currentQuantity = reserved !== null
    ? item.initialAvailableQuantity - reserved
    : item.initialAvailableQuantity;

  res.json({
    ...item,
    currentQuantity,
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const reserved = await getCurrentReservedStockById(itemId);
  const reservedCount = reserved !== null ? reserved : 0;
  const available = item.initialAvailableQuantity - reservedCount;

  if (available <= 0) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  await reserveStockById(itemId, reservedCount + 1);

  return res.json({ status: 'Reservation confirmed', itemId });
});

// Start server
app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});
