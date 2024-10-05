import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Helper to get the directory name (since __dirname is not available in ECMAScript modules) AI assisted lines
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files (HTML, CSS, JS) from the 'public' directory AI assisted lines
app.use(express.static(path.join(__dirname, 'public')));

// Your API key and endpoint for fetching live exchange rates
const API_URL = 'https://v6.exchangerate-api.com/v6/66432a0d445cae7f966bdabe/latest/USD';

// API route to fetch exchange rates from the external API
app.get('/api/exchange-rates', async (req, res) => {
  try {
    // Fetch exchange rates from the external API
    const response = await fetch(API_URL);
    const data = await response.json();
    
    // Send the exchange rates to the frontend
    res.json(data);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
