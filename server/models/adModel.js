const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const User = require('./userModel')
const adSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    location:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,   
        required:true
    },
    sellingBy:{
        type:ObjectId,
        ref:User
    },
    date:{
        type:String,
    },
    details:{
        type:[Object]
    }
})




const Ad = mongoose.model('ad',adSchema);

module.exports = Ad

