
const express = require('express');
const dotenv=require('dotenv');
dotenv.config();
const logger= require('morgan');
const env = require('./config/environment');
const app=express();
const port = 8000;
const cookieParser = require('cookie-parser');
const path= require('path');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// required for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware= require('./config/middleware');

// setup the chat server to be used  using socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

if(env.name=='development'){
    app.use(sassMiddleware({
        src:path.join(__dirname,env.assets_path,'/scss'),
        dest: path.join(__dirname,env.assets_path,'/css'),
        debug: false,
        outputStyle: 'expanded',
        prefix:'/css'
    
    }));
}

app.use(logger(env.morgan.mode,env.morgan.options))


app.use(expressLayouts);

app.use(express.urlencoded());
// using cookie by app as middleware
app.use(cookieParser());


// monoStore is use to store session cookies in db

// seeing up session and secret key for passport authentication
app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: (1000 * 60 * 100) },
    store : MongoStore.create (
            {
                mongoUrl: 'mongodb://localhost:27017/codeial_development',
            autoRemove: 'disable'
            },
        function(err){
            console.log(err || 'connected-mongodb setup ok');
        }
    )
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.setAuthenticateUser);
  app.use(flash());
  app.use(customMware.setFlash);


  // use the express router
const routes= require('./routes');
app.use('/',routes);

// setting up the view engine

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
// console.log(path.join(__dirname,'./views'));

app.use(express.static(env.assets_path));

// way to declare upload file path make the upload path avliable to the browser
app.use('/uploads',express.static(__dirname +'/uploads'));

// extract style and scripts from sub pages into the payout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port:  ${port}`);
});
