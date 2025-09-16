// backend/config/db.js
const mongoose = require('mongoose');

let cached = global.__mongoose;
if (!cached) cached = global.__mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI;
  console.log('[DEBUG] MONGO_URI defined?', !!uri);
  console.log('[DEBUG] MONGO_URI length:', uri ? uri.length : 'undefined');

  if (!uri) {
    const err = new Error('MONGO_URI is not defined in env');
    console.error('[DEBUG] connectDB error:', err);
    throw err;
  }

  if (!cached.promise) {
    console.log('[DEBUG] creating mongoose promise...');
    const opts = { bufferCommands: false, serverSelectionTimeoutMS: 5000 };
    cached.promise = mongoose.connect(uri, opts)
      .then(m => {
        console.log('[DEBUG] mongoose connected (then)');
        return m;
      })
      .catch(e => {
        console.error('[DEBUG] mongoose.connect failed:', e && e.stack ? e.stack : e);
        // clear promise so future attempts can retry
        cached.promise = null;
        throw e;
      });
  } else {
    console.log('[DEBUG] using cached.promise');
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
