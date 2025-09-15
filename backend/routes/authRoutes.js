const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authControllers');


router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router; //exportando as r