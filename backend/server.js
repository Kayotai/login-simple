const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);

module.exports = app; // Vercel vai usar esse app como handler
