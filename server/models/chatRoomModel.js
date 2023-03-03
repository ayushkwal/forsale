const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const User = require('./userModel')

const ChatRoomSchema = new mongoose.Schema({
    sender:{
        type:ObjectId,
        ref:User
    },
    receiver:{
        type:ObjectId,
        ref:User
    }
})

const ChatRoom = mongoose.model('chatRoom',ChatRoomSchema);
module.exports = ChatRoom