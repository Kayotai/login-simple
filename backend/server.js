
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

const app = express();

// pegar URI do MongoDB da variável de ambiente (Vercel)
const MONGO_URI = process.env.MONGO_URI;

// Conectar ao MongoDB **uma vez** ao iniciar a função serverless
connectDB(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// enviar todas as requisições /signup e /login para authRoutes
app.use('/', authRoutes);

module.exports = app; // serverless precisa exportar o app
