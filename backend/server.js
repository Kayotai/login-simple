// backend/server.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/', authRoutes);

// DEBUG ROUTE - shows connection status and masked URI length
app.get('/__debug/db', async (req, res) => {
  try {
    const uriDefined = !!process.env.MONGO_URI;
    const len = process.env.MONGO_URI ? process.env.MONGO_URI.length : 0;
    res.json({ ok: true, uriDefined, uriLength: len });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

// connect (log errors)
connectDB()
  .then(() => console.log('[DEBUG] connectDB() resolved in server.js'))
  .catch(err => {
    console.error('[DEBUG] connectDB() rejected in server.js:', err && err.stack ? err.stack : err);
  });

module.exports = app;
