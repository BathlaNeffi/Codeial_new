const User = require('../models/user');
const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;

passport.use(new LocalStrategy( {
    usernameField: 'email'
    },

    async function(email, password, done) {
        try {
           const user= await  User.findOne({ email: email });
                if (!user || user.password!= password) { 
                    console.log('Invalid username/Password');
                    return done(null, false); 
                }
                return done(null, user);
        } catch (error) {
            console.log('err in finding user ---> Passport')
            return done(error);
        }
    }
      
  ));


//   serialize the user  to decide wich key is to be kept in the cookies

passport.serializeUser(function(user, cb) {

      cb(null, user.id);

  });


//   deserialize the user from the key from cookies


passport.deserializeUser( async function(id, cb) {
    try {
        const user=User.findById(id);
        if(user){
            return cb(null,user);
        }
    } catch (error) {
        console.log('err in finding user ---> Passport')
        return done(error);
    }
    
  });


module.exports=passport;