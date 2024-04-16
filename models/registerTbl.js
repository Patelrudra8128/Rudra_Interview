const mongoose = require('mongoose');

const registerData = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
})

const register = mongoose.model('register',registerData);
module.exports = register;