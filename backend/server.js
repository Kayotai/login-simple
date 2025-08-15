const express = require('express'); //vai ajudar a cuidar da parte do servidor
const path = require('path'); //vai ajudar a concertar os caminhos de arquivos de acordo com o modelo da máquina
const users = require('./data'); //importando a lista de usuarios


const app = express(); //iniciando a funcao

const PORT = 3000; //definindo uma porta

app.use(express.static(path.join(__dirname, "..frontend")));
