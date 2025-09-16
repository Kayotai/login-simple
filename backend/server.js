const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

// Conectar ao MongoDB assim que o servidor iniciar
connectDB().catch((err) => {
  console.error("Erro ao conectar no MongoDB:", err);
});

app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);

module.exports = app;
