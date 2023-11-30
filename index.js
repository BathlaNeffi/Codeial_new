const express = require('express');
const app=express();
const port = 8000;
const routes= require('./routes');

// use the express router
app.use('/',routes);

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port:  ${port}`);
});
