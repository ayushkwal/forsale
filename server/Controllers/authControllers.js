const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
require('dotenv').config()
const createToken = (id)=>{
    return jwt.sign({id},'process.env.secret',{expiresIn:3*60*60*24});
}


module.exports.signin_get = (req,res)=>{
    res.render('signin')
}

module.exports.signin_post = async(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body)
    try{
        const newUser = await User.login({email,password})
        const token =  createToken(newUser._id);
        console.log(newUser); 
        res.cookie('jwt',token,{httpOnly:true,maxAge:3000*24*60*60})
        return res.json(newUser)
    }
    catch(err){
        if(err.message.includes('Email does not exist')) return res.json({error:{email:"Email does not exist",password:""}})
        if(err.message.includes('Incorrect Password')) return res.json({error:{email:"",password:"Wrong password"}})
        return res.json({error:{email:"Something went wrong",password:""}})
    }
}

module.exports.signup_get = (req,res)=>{
    res.render('signup')
}

module.exports.signup_post = async(req,res)=>{
    const {email,password,username}=req.body;
    console.log(email,password)
    try{
        const newUser = await User.create({email,password,username})
        const token =  createToken(newUser._id);
        console.log(newUser);
        res.cookie('jwt',token,{httpOnly:true,maxAge:3000*24*60*60})
        return res.json(newUser)
    }
    catch(err){
        console.log(err.code);
        console.log("________________",err,err.keyValue)
        if(err.code===11000) return res.json({error:{email:`${Object.keys(err.keyValue)[0]} already exists`,password:""}})
        return res.json({error:{email:err.errors.email?.message,password:err.errors.password?.message,username:err.errors.username?.message}})
    }
}

module.exports.signout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/signin')
}

module.exports.getuser_post = async(req,res)=>{
    const {id}=req.body;
    try{
        const newUser = await User.findById(id).select({"email":1,"_id":1})
        console.log(newUser,'is new user'); 
        return res.json(newUser)
    }
    catch(err){
        return res.json({error:'Not a person'})
    }
}
module.exports.user_get = async(req,res)=>{
    const id = req.params.id;
    const newUser = await User.findById(id).select({'password':0})
        console.log(newUser,'is new user'); 
        return res.json(newUser)
}
module.exports.editprofile_post = async(req,res)=>{
    let {id,username,name,email,phone,address,pincode,bio,password,newPassword} = req.body;
    const obj = {};
    if(username) obj.username = username;
        if(name) obj.fullName = name;
        if(email) obj.email = email;
        if(phone) obj.phone = phone;
        if(address) obj.address = address;
        if(pincode) obj.pincode = pincode;
        if(bio) obj.bio = bio;
    console.log(obj)
    const newUser = await User.findOneAndUpdate({_id:id},obj,{new:true})
    if(password){
        const auth = await bcrypt.compare(password,newUser.password);
        if(auth){
            const salt = await bcrypt.genSalt();
            newPassword = await bcrypt.hash(newPassword,salt);
           const a = await User.findOneAndUpdate({_id:id},{password:newPassword},{new:true})
           if(a){
            return res.json({status:'success'})
           }else{
            return res.json({status:'Password not changed'})
           }
        }else{
            return res.json({status:'Incorrect current password'})
        }
    }else{
        return res.json({status:'success'})
    }

    

}