const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email e senha são obrigatórios.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.send('Usuário cadastrado com sucesso!');
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send('Este e-mail já está cadastrado.');
    }
    res.status(500).send('Erro ao cadastrar usuário.');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Usuário não encontrado.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Senha inválida.');

    res.send('Login bem-sucedido!');
  } catch (err) {
    res.status(500).send('Erro ao fazer login.');
  }
};
