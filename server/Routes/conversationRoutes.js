const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/chatRoomModel')
const Message = require('../models/messageModel')


router.post('/createconversation', async(req, res) => {
    console.log(req.body);
    try {
        const a = await ChatRoom.findOne({sender:req.body.sender,receiver:req.body.receiver})
        const c = await ChatRoom.findOne({receiver:req.body.sender,sender:req.body.receiver})
        if(!a&&!c){
             const b = await ChatRoom.create(req.body);
             console.log(b.id)
             return res.json({id:b.id})
            }
        else{  console.log('conversation already exists');
            if(a) return res.json({id:a.id})
            if(c) return res.json({id:c.id})
    }
    } catch (err) {
        console.log(err)
    }
});
router.post('/savemessage',async(req,res)=>{
    console.log(req.body)
    const a = await Message.create(req.body);
    if(a) return res.json({success:'message sent'})
    else return res.json({error:'message not sent'})

})
router.post('/getmessages',async(req,res)=>{
    const a = await Message.find(req.body).sort({date:1})
    console.log(a)
    if(a) return res.json({messages:a})
    else return res.json({error:'message not sent'})

})
router.post('/getchatrooms',async(req,res)=>{
    // {req.body.user}
    const a = await ChatRoom.find({sender:req.body.user}).select({receiver:1}).populate('receiver','_id email username')
    const b = await ChatRoom.find({receiver:req.body.user}).select({sender:1}).populate('sender','_id email username')
    console.log(a)
    if(a&&b) return res.json({chatlist:[...a,...b]})
    if(a) return res.json({chatlist:a})
    if(b) return res.json({chatlist:b})
    else return res.json({error:'no chatlist found'})

})

module.exports = router;