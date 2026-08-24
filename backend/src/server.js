const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const dateRoutes = require('./routes/dateRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
  ],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api', dateRoutes);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🌹 Romantic API Server running on http://localhost:${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health\n`);
});
