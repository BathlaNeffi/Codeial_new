const Post = require('../models/post');
const Comment= require('../models/comment');
module.exports.create=async(req,res)=>{
    try {
                const postCreated= await Post.create({
                    content:req.body.content,
                    user: req.user._id
                });
                if(postCreated){
                    console.log(postCreated.content);
                    return res.redirect('back');
                }
            
    } catch (error) {
        console.log(error);
    }
}


module.exports.destroy= async(req,res)=>{
    try {
        
        const post= await Post.findById(req.params.id);
        if(post){
            if(post.user == req.user.id){
                await Post.deleteOne({_id:post.id});
                

                await Comment.deleteMany({ post: req.params.id});
                return res.redirect('back');  
            }else{
                console.log('error in deleting post');
            }
           
        }
        else{
               return res.redirect('back');  
        }
    } catch (error) {
        console.log(error);
    }
}