 const express = require('express');
 const router = express.Router();
 const authController = require('../Controllers/authControllers')
 const {checkUser,requireAuth} = require('../Middlewares/authMiddleware')

 router.get('/signin',authController.signin_get);
 router.post('/signin',authController.signin_post);
 router.get('/signup',authController.signup_get);
 router.post('/signup',authController.signup_post);
 router.get('/signout',authController.signout_get);
 router.get('/user/:id',authController.user_get)
 router.post('/editprofile',authController.editprofile_post)
 router.post('/getuser',requireAuth,authController.getuser_post);

 module.exports = router;