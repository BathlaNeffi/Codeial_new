const express =require('express');

const router =express.Router();

const usersController = require('../controller/users_controller');

router.get('/profile',usersController.users);

module.exports=router;