const mongoose = require('mongoose');
const resetPasswordScheama= new mongoose.Schema({
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken:{
        type: String,
        require: true
    },
    isValid:{
        type:Boolean,
        require: true
    }
},{
    timestamps:true
});

const resetPassword= mongoose.model('resetPassword',resetPasswordScheama);
module.exports= resetPassword;