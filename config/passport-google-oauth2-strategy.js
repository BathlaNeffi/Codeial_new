const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User= require('../models/user');
const env= require('./environment');


passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url,
  },
  async function(accessToken, refreshToken, profile, done) {
    try {   
        const user= await User.findOne({email:profile.emails[0].value});
        if(user){  
            // console.log(profile);
            // console.log('************', accessToken, '*********', refreshToken);
            return done(null,user);
        }else{
         const newUser=await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            if(newUser){
                return done(null,newUser);
            }
        }
    } catch (error) {
        console.log('error in  google  strategy-passport', error);
        return;
    }

  
  }
));




module.exports=passport;