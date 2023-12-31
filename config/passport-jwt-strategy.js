const passport= require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env= require('./environment');

const User = require('../models/user');

let opts={
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_secret
}

passport.use(new JWTStrategy(opts, async function(jwt_payload, done){
    try {
        const user = await User.findById(jwt_payload._id);
        
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    
        
    } catch (error) {
       
            return done(error, false);
        
    }

   
}));

module.exports=passport;