const mongoose = require("mongoose");
const connectDB = require("../config/db");

const uri = process.env.MONGO_URI;
connectDB(uri); // garante conexão na hora de carregar o model

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
