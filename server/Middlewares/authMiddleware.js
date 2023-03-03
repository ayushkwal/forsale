const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require("../models/userModel");

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'process.env.secret',(err,decodedToken)=>{
            if(err){
                console.log(err);
                return res.json({error:'Not a valid user'})
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        return res.json({error:'Not a valid user'})
    }
}


//Used in Nodejs form Authentication to have details of user
const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    console.log('checking for token:',token)
    if(token){
        jwt.verify(token,'process.env.secret',async(err,decodedToken)=>{
            if (err) {
                res.locals.usered = null;
                next();
              } else {
                let usera = await User.findById(decodedToken.id);
                res.locals.usered = usera;
                next();
              }
            });
          } else {
            res.locals.usered = null;
            next();
    }
}

module.exports = {checkUser,requireAuth};