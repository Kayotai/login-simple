const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conecta uma vez ao MongoDB
connectDB()
  .then(() => console.log("MongoDB conectado no Server"))
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));

// Rotas
app.use("/", authRoutes);

// Exporta app para Vercel
module.exports = app;
