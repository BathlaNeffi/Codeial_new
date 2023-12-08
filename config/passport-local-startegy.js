const User = require('../models/user');
const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;

passport.use(new LocalStrategy( {
    usernameField: 'email',
    passReqToCallback: true
    },

    async function(req,email, password, done) {
        try {
           const user= await  User.findOne({ email: email });
                if (!user || user.password!= password) { 
                    req.flash('error','Invalid username/Password');
                    // console.log('Invalid username/Password');
                    return done(null, false); 
                }
                return done(null, user);
        } catch (error) {
            req.flash('error',error);
            // console.log('err in finding user ---> Passport')
            return done(error);
        }
    }
      
  ));


// //   serialize the user  to decide wich key is to be kept in the cookies

passport.serializeUser(function(user, done) {

      done(null, user.id);

  });


//   deserialize the user from the key from cookies


passport.deserializeUser( async function(id, done) {
    try {
        const user= await User.findById(id);
        if(user){
            return done(null,user);
        }
    } catch (error) {
        console.log('err in finding user ---> Passport')
        return done(error);
    }
    
  });

// check if the user is authenticated
passport.checkAuthentication= function(req,res,next){

    // if the user is signed in the pass on the control to next function(that is user's controller)
    if(req.isAuthenticated()){
        return next();
    };
    // if the user is not signed in

    return res.redirect('/users/sign-in');
}

passport.setAuthenticateUser = function(req,res,next){
    if(req.isAuthenticated()){
        //  req.user contains  the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
       
    }
    return next();
}


module.exports=passport;



 
