const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authControllers');

//ajuste das rotas conforme o tipo de req
router.post('/signup', authController.signup); 
router.post('/login', authController.login);

module.exports = router; //exportando a bomba