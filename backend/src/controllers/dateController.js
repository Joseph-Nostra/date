const emailService = require('../services/emailService');

const createDate = async (req, res, next) => {
  try {
    const { date, time, activity, location, place, note } = req.body || {};

    const missingFields = [];
    if (!date) missingFields.push('date');
    if (!time) missingFields.push('time');
    if (!activity) missingFields.push('activity');
    if (!location && !place?.name) missingFields.push('location');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    const dateData = {
      date,
      time,
      activity,
      location: location || place?.name,
      place: place || null,
      note: note || '',
    };

    // Trigger email sending
    try {
      await emailService.sendDateNotification(dateData);
    } catch (emailErr) {
      console.error('⚠️ Email delivery warning/error:', emailErr.message);
      // If email fails due to unconfigured SMTP in dev, return clear failure response
      // or bubble error if needed.
      return res.status(500).json({
        success: false,
        message: 'Could not send date notification email. Please verify SMTP credentials.',
        error: emailErr.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Date request sent successfully',
      data: dateData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDate,
};
