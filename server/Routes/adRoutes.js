const express = require('express');
const router = express.Router();
const adControllers = require('../Controllers/adControllers')
const {requireAuth,checkUser} = require('../Middlewares/authMiddleware')


router.post('/ad',adControllers.ad_post);
router.get('/ad',adControllers.ad_get);
router.get('/getUsers',adControllers.users_get);
router.get('/ad/:id',adControllers.particular_ad_get);
router.get('/myads/:id',adControllers.myads_get);

module.exports = router;