const mongoose = require('mongoose');
const env= require('./environment');
mongoose.connect(`mongodb://localhost:27017/${env.db}`);
const db=mongoose.connection;
db.on('error', console.error.bind(console,'Error in connecting to the MongoDB'));
db.once('open',function(){
    console.log('Connected to the Database :: Mongo DB ');
})

module.exports=db;