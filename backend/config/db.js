const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(uri) {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;




// const connectDB = async () => {
//   try 
//   {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('Conectado ao MongoDB');
//   } 
//   catch (err) 
//   {
//     console.error('Erro ao conectar:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
