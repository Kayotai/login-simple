const express = require('express'); //vai ajudar a cuidar da parte do servidor
const path = require('path'); //vai ajudar a concertar os caminhos de arquivos de acordo com o modelo da máquina
const users = require('./data'); //importando a lista de usuarios


const app = express(); //iniciando a funcao

const PORT = 3000; //definindo uma porta

app.use(express.urlencoded({extended: true})); //Pegando as informações do formulario e deixando de forma que o código entenda

app.use(express.static(path.join(__dirname, "../frontend"))); //Dando a requisição para quando for solicitado a página estatica

app.post('/login', (req, res) => { //quando uma requisição do tipo post chegar com a url login...
    const {email, password} = req.body; //...eu armazeno as informações do formulario de login nas variaveis de mesmo nome
    const user = users.find(u => u.email === email && u.password === password); //Dentro de uma variavel para armazenar a resposta, verifico se existe algum email e senha dentro de users que seja igual ao que foi enviado pelo form.

    if (user)
    {
        res.send
        (`
            <script>
                alert('Login Sucess yep');
                window.location.href = '/';
            </script>
        `);
    }
    else
    {
        res.send
        (`
            <script>
                alert('Login Error');
                window.location.href = '/';
            </script>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});