const express = require('express');
const app=express();
const port = 8000;
const routes= require('./routes');
const path= require('path');

// use the express router
app.use('/',routes);

// setting up the view engine

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
// console.log(path.join(__dirname,'./views'));


app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port:  ${port}`);
});
