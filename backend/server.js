require('dotenv').config();
const express = require('express'); //vai ajudar a cuidar da parte do servidor
const path = require('path'); //vai ajudar a concertar os caminhos de arquivos de acordo com o modelo da máquina
const User = require('./user'); //importando a lista de usuarios
const mongoose = require('mongoose'); //importando mongoose
const app = express(); //iniciando a funcao

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = 3000; //definindo uma porta

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected'))
    .catch(err => console.error('Error'));

//#region Application(app)
    app.use(express.urlencoded({extended: true})); //Pegando as informações do formulario e deixando de forma que o código entenda
    app.use(express.static(path.join(__dirname, "../frontend"))); //Dando a requisição para quando for solicitado a página estatica
    
    app.post('/new', async (req, res) => { //Se uma requisição new chegar, informo que vai ser uma função que demanda tempo...
        
        try //tentativa...
        {
            const {email, password} = req.body; //Pego as informações vindas da requisição do front
            const newUser = new User({email, password}); //Crio um novo cadastro
            await newUser.save(); //Pausa da execução aqui
            res.send('Usuário cadastrado com sucesso');
        }
        catch (err) //Se der erro...
        {
            console.error(err);
            res.status(500).send('Erro ao cadastrar usuário');
        }
    });
    
    app.post('/login', async (req, res) => { //Se uma requisição de formulario (/login) chegar, eu executo uma função dizendo que elq levqrá tempo

        try //Tentativa
        {
            const {emai, password} = req.body; //pego as informações do front
            const user = await User.findOne({email}); //digo para esperar aqui enquanto é verificado se o email existe no bancode dados
            if (!user) //Se o usuario não for encontrado
            {
                return res.status(400).send('Email incrreto'); //retorno um erro
            };

            if (user.password !== password)
            {
                return res.status(400).send('Senha incorreta')
            };

            res.send('Login bem-sucedido');
        }
        catch (err)
        {
            console.error(err);
            res.status(500).send('Erro no servidor.');
        };
    })
    
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    }); //Iniciando a porta
//#endregion