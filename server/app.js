const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const adRoutes = require('./Routes/adRoutes')
const conversationRoutes = require('./Routes/conversationRoutes')
const chatRoutes = require('./Routes/chatRoutes')
require("dotenv").config()
const {requireAuth,checkUser} = require('./Middlewares/authMiddleware')
const app =express();



app.set('view engine','ejs');
app.use(express.json());
app.use(express.static('public'))
app.use(cookieParser());


app.get('*',checkUser)
app.get('/',(req,res)=>{
    res.render('home')
})

app.use(authRoutes)
app.use(adRoutes)
app.use(conversationRoutes)

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://ak:h0EVlFXGYUi3rsVS@cluster0.9eeuwie.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    console.log("Successfully connected to database");
}).catch((err)=>{
    console.log("Error in Connecting to Database");
})

app.listen(3000,'192.168.29.33')