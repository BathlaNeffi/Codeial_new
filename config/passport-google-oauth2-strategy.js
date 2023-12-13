const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User= require('../models/user');


passport.use(new googleStrategy({
    clientID:'888790478400-t7913f9ktrgors042g231g4flobjb2fv.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/users/auth/google/callback"
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