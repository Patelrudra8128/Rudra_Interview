const mongoose = require('mongoose');

const productData = mongoose.Schema({
    cid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'register'
    },
    pname : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
})

const product = mongoose.model('product',productData);
module.exports = product;