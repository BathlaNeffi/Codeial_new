const Like= require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike= async(req,res)=>{
    try {
        // likes/toggle/?id=abcdf&type=Post
        let likeable;
        let deleted=false;
        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }else{
            
            likeable=await Comment.findById(req.query.id).populate('likes');
        }
        // check if like already exits
            let existingLike= await Like.findOne({
                likeable:req.query.id,
                onModel:req.query.type,
                user:req.user._id
            });
            // if already like exist the delete it!!
            if(existingLike){
                await likeable.likes.pull(existingLike._id);
                likeable.save();
                await Like.findByIdAndDelete(existingLike._id);
                deleted=true;
            }else{
                let newLike = await Like.create({
                    user: req.user._id,
                    likeable: req.query.id,
                    onModel: req.query.type
                });
               
                    await likeable.likes.push(newLike._id);
                    await likeable.save();
               
            }

        return res.status(200).json({
            message: "Request Successfull!!",
            data: {
                deleted : deleted
            }
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:'Internal Server Eroor'
        })
        
    }
}