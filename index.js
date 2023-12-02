const express = require('express');
const app=express();
const port = 8000;
const path= require('path');
const expressLayouts=require('express-ejs-layouts');

app.use(expressLayouts);


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
