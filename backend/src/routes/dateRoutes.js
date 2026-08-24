const express = require('express');
const router = express.Router();
const dateController = require('../controllers/dateController');

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Romantic API is running ❤️',
  });
});

// Create date & send email notification
router.post('/dates', dateController.createDate);

module.exports = router;
