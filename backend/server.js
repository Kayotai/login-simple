//Requires
const express = require("express"); 
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express(); //ligando o express

app.use(express.json()); //em casos de json, deixo legível
app.use(express.urlencoded({ extended: true })); //deixo o formulario legivel
app.use(express.static(path.join(__dirname, "../frontend"))); //em caso de requisição de uma página estatica, entrego o endereço e envio
app.use("/", authRoutes);   //digo que a bomba da requisição é do routes

// conectar uma vez ao iniciar (Vercel executa o módulo em runtime)
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

module.exports = app; //expporto a aplicação
