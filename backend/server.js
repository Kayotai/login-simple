const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/", authRoutes);

// conectar uma vez ao iniciar (Vercel executa o módulo em runtime)
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

module.exports = app;
