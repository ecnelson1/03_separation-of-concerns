const express = require('express');
const twilio = require('twilio');
const pool = require('./utils/pool');
const app = express();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
  
app.use(express.json());

app.post('/api/v1/orders', async(req, res, next) => {
  try {
    await twilioClient.messages.create({
      body: `New Order received for ${req.body.quantity}`,
      from: process.env.TWILIO_NUMBER,
      to: process.env.ORDER_HANDLER_NUMBER
    });

    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [req.body.quantity]
    );
    
    res.send(rows[0]);
  } catch(err) {
    next(err);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
