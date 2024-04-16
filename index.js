const express  = require('express');
const app = express();
const port = 4000;
const db = require('./config/db');
const passportJWT = require('./config/passportJwtStrategy');
const path = require('path');
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname,'/uploads')));
app.use('/',require('./routes/indexRoutes'));
app.listen(port,(err)=>{
    if(err){
        console.log("Server not ready");
        return false;
    }
    console.log("Server is running on port: "+port);
})