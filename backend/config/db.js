const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null };

async function connectDB(uri) {
  if (cached.conn) return cached.conn;

  const opts = { bufferCommands: false };
  cached.conn = await mongoose.connect(uri, opts);
  return cached.conn;
}

module.exports = connectDB;
