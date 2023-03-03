const mongoose = require('mongoose');
const User = require('./userModel')
const ChatRoom = require('./chatRoomModel')
const {ObjectId} = mongoose.Schema.Types


const chatSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    sender:{
        type:ObjectId,
        ref:User
    },
    chatRoom:{
        type:ObjectId,
        ref:ChatRoom
    },
    date:{
        type:String,
        default:Date.now()
    },
})

const Message = mongoose.model('chat',chatSchema);
module.exports = Message

