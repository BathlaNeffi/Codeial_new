const express =require('express');
const router =express.Router();
const passport = require('passport');
const usersController = require('../controller/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.users);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.create);
router.post('/create-session',
passport.authenticate('local',{
    // successRedirect: '/users/profile',
    failureRedirect: '/users/sign-in'
  })
,usersController.createSession);

router.get('/sign-out',usersController.destroySession);

module.exports=router;