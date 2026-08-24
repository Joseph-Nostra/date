const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

const dateRoutes = require('./routes/dateRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',

    // URL ديال React deployed
    'https://date-frontend-black.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api', dateRoutes);

// Error Handler
app.use(errorHandler);

// Export for Vercel
module.exports = app;

// Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🌹 Romantic API Server running on http://localhost:${PORT}`);
    console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
  });
}