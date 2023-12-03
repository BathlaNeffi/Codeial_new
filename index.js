const express = require('express');
const app=express();
const port = 8000;
const cookieParser = require('cookie-parser');
const path= require('path');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// required for session cookie
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-startegy');


app.use(expressLayouts);

app.use(express.urlencoded());
// using cookie by app as middleware
app.use(cookieParser());




// seeing up session and secret key for passport authentication
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: (1000 * 60 * 100) }
  }));

  app.use(passport.initialize());
  app.use(passport.session());


  // use the express router
const routes= require('./routes');
app.use('/',routes);

// setting up the view engine

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
// console.log(path.join(__dirname,'./views'));

app.use(express.static('./assets'));
// extract style and scripts from sub pages into the payout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port:  ${port}`);
});
