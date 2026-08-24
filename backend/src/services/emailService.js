const nodemailer = require('nodemailer');

const createTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const parts = dateStr.split(/[-/]/);
    if (parts.length === 3) {
      // Handles YYYY-MM-DD or DD/MM/YYYY
      const year = parts[0].length === 4 ? parts[0] : parts[2];
      const month = parts[0].length === 4 ? parts[1] : parts[1];
      const day = parts[0].length === 4 ? parts[2] : parts[0];
      const dateObj = new Date(`${year}-${month}-${day}T00:00:00`);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
      }
    }
  } catch (e) {
    // Fallback to raw string
  }
  return dateStr;
};

const sendDateNotification = async (dateData) => {
  const transporter = createTransporter();
  const recipient = process.env.EMAIL_TO || process.env.EMAIL_USER;

  const displayDate = formatDisplayDate(dateData.date);
  const displayTime = dateData.time || 'N/A';
  const activity = dateData.activity || 'N/A';
  const location = dateData.location || dateData.place?.name || 'N/A';
  const note = dateData.note || null;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Romantic Date Request</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #0d0509;
          color: #f5e6ec;
          margin: 0;
          padding: 30px 15px;
        }
        .card {
          max-width: 520px;
          margin: 0 auto;
          background: linear-gradient(180deg, #1a0a10 0%, #280c16 100%);
          border: 1px solid #6b1d3a;
          border-radius: 20px;
          padding: 35px 25px;
          box-shadow: 0 10px 30px rgba(168, 23, 68, 0.3);
        }
        .header {
          text-align: center;
          margin-bottom: 25px;
        }
        .header h1 {
          color: #ffd1dc;
          font-size: 26px;
          margin: 10px 0 5px 0;
          font-weight: 600;
        }
        .header p {
          color: #e8a0b4;
          font-size: 14px;
          margin: 0;
          opacity: 0.8;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #a81744, transparent);
          margin: 20px 0;
        }
        .field {
          margin-bottom: 18px;
        }
        .label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #e8a0b4;
          opacity: 0.7;
          margin-bottom: 4px;
        }
        .value {
          font-size: 16px;
          color: #ffffff;
          font-weight: 500;
        }
        .note-box {
          background: rgba(107, 29, 58, 0.3);
          border: 1px solid rgba(168, 23, 68, 0.4);
          border-radius: 12px;
          padding: 15px;
          margin-top: 20px;
        }
        .note-box p {
          margin: 0;
          font-style: italic;
          color: #ffd1dc;
          font-size: 14px;
          line-height: 1.5;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 12px;
          color: #e8a0b4;
          opacity: 0.6;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div style="font-size: 40px;">🌹</div>
          <h1>❤️ NEW DATE REQUEST</h1>
          <p>Someone has planned a romantic date with you.</p>
        </div>

        <div class="divider"></div>

        <div class="field">
          <div class="label">📅 Date</div>
          <div class="value">${displayDate}</div>
        </div>

        <div class="field">
          <div class="label">🕐 Time</div>
          <div class="value">${displayTime}</div>
        </div>

        <div class="field">
          <div class="label">❤️ Activity</div>
          <div class="value">${activity}</div>
        </div>

        <div class="field">
          <div class="label">📍 Location</div>
          <div class="value">${location}</div>
        </div>

        ${
          note
            ? `
          <div class="note-box">
            <div class="label" style="margin-bottom: 6px;">💌 Romantic Note</div>
            <p>"${note}"</p>
          </div>
        `
            : ''
        }

        <div class="divider"></div>

        <div class="footer">
          Sent with love from your Romantic Date Planner app ❤️
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Romantic Date Planner" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject: '❤️ New Romantic Date Request',
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✉️ Email sent successfully:', info.messageId);
  return info;
};

module.exports = {
  sendDateNotification,
};
