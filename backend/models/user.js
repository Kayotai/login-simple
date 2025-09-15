const mongoose = require('mongoose'); //colocando mongoose em uma variavel

const userSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true, //obrigatório
        unique: true, //permite só um email com o mesmo nome
    },
    password: {
        type: String,
        required: true, //obrigatório
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
