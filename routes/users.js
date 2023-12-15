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


router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email']}));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/sign-in'}),usersController.createSession);

router.get('/forgot-password',usersController.forgot_password);
router.post('/forgot-password-form/',usersController.forgot_password_form);
router.get('/reset_password/',usersController.confirmResetPassword);
router.post('/confirm-reset-password',usersController.confirmResetPasswordPost);

module.exports=router;