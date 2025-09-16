
const path = require('path');
const express = require('express'); //vai ajudar a cuidar da parte do servidor
const authRoutes = require('./routes/authRoutes'); //preparando a variavel para usar o authRoutes
const connectDB = require('./config/db');


const app = express(); //iniciando o express para cuidar das requisicoes do servidor
app.use(express.static(path.join(__dirname, '../frontend')));

connectDB(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json()); //Se chegar um arquivo json, deixo legivel
app.use(express.urlencoded({ extended: true}));
app.use('/', authRoutes); //se chegar uma requisição, envio para o authRoutes, responsavel por lidar com elas

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
/*
 //#region Application(app)
    app.use(express.urlencoded({extended: true})); //Pegando as informações do formulario e deixando de forma que o código entenda
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "../frontend"))); //Dando a requisição para quando for solicitado a página estatica
    
    app.post('/signup', async (req, res) => { //Se uma requisição new chegar, informo que vai ser uma função que demanda tempo...
        
        try //tentativa...
        {
            const {email, password} = req.body; //Pego as informações vindas da requisição do front
            
        if (password.length < 8) {
              return res.status(400).send('Senha muito curta');
        };

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (!emailRegex.test(email)) {
            return res.status(400).send('Email inválido');
        };

            // Adição da validação de back-end
            if (!email || !password) 
            {
                return res.status(400).send('Email e senha são obrigatórios.');
            };

            //gerando uma string aleatória
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds); //codificando a senha
            const newUser = new User({email, password: hashedPassword}); //Crio um novo cadastro
            await newUser.save(); //Pausa da execução aqui
            res.send('Usuário cadastrado com sucesso');
        }
        catch (err) //Se der erro...
        {
            console.error(err);
            if (err.code === 11000) 
            {
                return res.status(400).send('Este e-mail já está cadastrado.');
            };
            res.status(500).send('Erro ao cadastrar usuário');
        }
    });
    
    app.post('/login', async (req, res) => { //Se uma requisição de formulario (/login) chegar, eu executo uma função dizendo que elq levqrá tempo

        try //Tentativa
        {
            const {email, password} = req.body; //pego as informações do front
            
             // Adição da validação de back-end
            if (!email || !password) 
            {
                return res.status(400).send('Email e senha são obrigatórios.');
            };
            
            const user = await User.findOne({email}); //digo para esperar aqui enquanto  puxo as informações da conta e armazeno no user
            if (!user) //Se o usuario não for encontrado
            {
                return res.status(400).send('Email ou Senha incorretos'); //retorno um erro
            };

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
            {
                return res.status(400).send('Email ou Senha incorretos')
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
*/