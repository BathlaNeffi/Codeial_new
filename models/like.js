const mongoose = require('mongoose');

const likeSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
    },
    // this defines the  objectId of the liked objects 
    likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath:'onModel'
    },
    onModel:{
        type: String,
        require: true,
        enum:['Post', 'Comment']
    }

},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);

module.exports= Like;