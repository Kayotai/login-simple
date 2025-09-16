const mongoose = require("mongoose");


//
const userSchema = new mongoose.Schema({ //defino o que as informações de usuario devem ter
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema); 
