const mongoose = require("mongoose");

let cached = global.__mongoose;
if (!cached) cached = global.__mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not defined");
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(uri, opts).then(m => {
      cached.conn = m;
      return m;
    }).catch(e => {
      cached.promise = null;
      throw e;
    });
  }

  await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
