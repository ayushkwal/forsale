const Ad = require('../models/adModel')
const User = require('../models/userModel')




module.exports.ad_post = async(req,res)=>{
    try{
        let ads = await Ad.create({sellingBy:req.body.id,name:req.body.productName,price:req.body.productPrice,description:req.body.productDescription,image:req.body.productImage,location:req.body.productLocation,date:Date.now(),details:req.body.productDetails})
        console.log(ads)
        return res.json(ads)
    }catch(err){
        console.log('error occured toa d post',err)
        return res.json({message:'Not saved'})
    }
}
module.exports.ad_get = async(req,res)=>{
    try{
        let ads = await Ad.find().select({image:1,_id:1,description:1,name:1,price:1})
        console.log(ads)
        return res.json({ads})
    }catch(err){
        console.log('error occured toa d possasat',err)
        return res.json({message:'No posts yet'})
    }
}
module.exports.particular_ad_get = async(req,res)=>{
    console.log('reached',req.params)
    try{
        let ads = await Ad.find({_id:req.params.id}).populate('sellingBy',"email _id username")
        console.log(ads,ads[0].details[0])
        return res.json({ads})
    }catch(err){
        console.log('error occured toa d possasat',err)
        return res.json({message:'No posts yet'})
    }
}
module.exports.users_get = async(req,res)=>{
    try{
        let users = await User.find().select({_id:1,email:1,username:1})
        console.log(users)
        return res.json({users})
    }catch(err){
        console.log('error occured toa d possasat',err)
        return res.json({message:'No posts yet'})
    }
}
module.exports.myads_get = async(req,res)=>{
    console.log('reached',req.params)
    try{
        let ads = await Ad.find({sellingBy:req.params.id})
        console.log(ads)
        return res.json({ads})
    }catch(err){
        console.log('error occured toa d possasat',err)
        return res.json({message:'No posts yet'})
    }
}