const mongoose = require("mongoose");

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI não está definido!");
  }

  const opts = { bufferCommands: false };
  cached.conn = await mongoose.connect(process.env.MONGO_URI, opts);

  console.log("✅ MongoDB conectado!");
  return cached.conn;
}

module.exports = connectDB;
