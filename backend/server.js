const express = require("express");
const path = require("path");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Conecta ao banco logo no início
connectDB();

app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);

module.exports = app;
