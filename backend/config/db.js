const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached)
{
  cached = global.mongoose = {conn: null, promisse: null};
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }


const connectDB = async () => {
  try 
  {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');
  } 
  catch (err) 
  {
    console.error('Erro ao conectar:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
