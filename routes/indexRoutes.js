const express = require('express');
const routes = express.Router();
const indexController = require('../controllers/indexController');
const multer = require('multer');
const passport = require('passport');

const fileupload = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'./uploads');
    },
    filename : (req,file,cb) => {
        cb(null,Date.now()+file.originalname);
    }
})

const imageupload = multer({storage : fileupload}).single('image');

routes.post('/register',indexController.register);
routes.post('/login',indexController.login);
routes.post('/addProduct',passport.authenticate('jwt',{session : false}),imageupload,indexController.addProduct);
routes.get('/viewAllProducts',passport.authenticate('jwt',{session : false}),indexController.viewAllProducts);
routes.get('/viewProducts',passport.authenticate('jwt',{session : false}),indexController.viewProducts);

module.exports = routes;