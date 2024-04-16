const registerTbl = require('../models/registerTbl');
const jwt = require('jsonwebtoken');
const productTbl = require('../models/productTbl');

const register = async (req,res) => {
    try {
        const{name,email,password} = req.body;
        let registerData = await registerTbl.create({
            name : name,
            email : email,
            password : password
        })
        if(registerData){
            res.json({ message : "User registered", status: 1});
        }else{
            res.json({ message : "User not registered", status: 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const login = async (req,res) => {
    try {
        const{email,password} = req.body;
        let loginData = await registerTbl.findOne({email : email});
        if(!loginData || loginData.password != password){
            res.json({ message : "Invalid email or password", status : 0});
        }else{
            const Token = jwt.sign({payload : loginData},'rudra',{expiresIn : '1hr'});
            return res.json({ token : Token});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addProduct = async (req,res) => {
    try {
        const{cid,pname,description} = req.body;
        let productData = await productTbl.create({
            cid : cid,
            pname: pname,
            description : description,
            image : req.file.path
        })
        if(productData){
            res.json({ message : "Product added", status : 1});
        }else{
            res.json({ message : "Product not added", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewAllProducts = async (req,res) => {
    try {
        let products = await productTbl.find({}).populate('cid');
        if(products){
            res.json({ Data : products, status : 1});
        }else{
            res.json({ message : " product not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewProducts = async (req,res) => {
    try {
        let prod = await productTbl.find({ cid : req.body.cid});
        if(prod){
            res.json({ Data : prod, status : 1});
        }else{
            res.json({ message : " product not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    register,
    login,
    addProduct,
    viewAllProducts,
    viewProducts
}