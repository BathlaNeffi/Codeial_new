const express =require('express');
const router =express.Router();
const usersController = require('../controller/users_controller');

router.get('/profile',usersController.users);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

module.exports=router;