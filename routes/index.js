const express= require('express');
const router = express.Router();
const homeController=require('../controller/home_controller');

// routing the request to home controller
router.get('/',homeController.home);

// router.use for all the users

router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/likes',require('./likes'));


router.use('/api',require('./api'));






module.exports=router;