const mongoose = require("mongoose");

let cached = global.__mongoose; //crio uma variavel global com o mongoose que eu já tinha
if (!cached) cached = global.__mongoose = { conn: null, promise: null }; //se não tiver nada no cached, eu crio 

async function connectDB() { //uma funcao para conectar no mongo
  if (cached.conn) return cached.conn; //se eu já tiver uma conexão, retorno ela mesma, reciclo

  const uri = process.env.MONGO_URI; //adiciono a variavel de ambiente da vercel nessa variavel
  if (!uri) {
    throw new Error("MONGO_URI is not defined"); //retorno um erro se não tiver nada na URI
  }

  if (!cached.promise) { //Se não tiver nenhuma conexão em andamento, ou seja, null
    const opts = { bufferCommands: false };
    //Crio uma conexão e deixo na fila, armazeno em promise
    cached.promise = mongoose.connect(uri, opts)
      .then(m => { //se a conexão dar bom, executa essa função
        cached.conn = m; //Guardar o objeto de conexão no conn, como um save de memory card
        return m; //retorno o objeto de conexão
      })
      .catch(e => { //se dar ruim na tentativa de conexão
        cached.promise = null; //apago o promise
        throw e; //pedindo arrego 
      });
  }

  await cached.promise; //espero a vez da conexão
  return cached.conn; //retorno a conexão
}

module.exports = connectDB;
