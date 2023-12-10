const Post = require('../models/post');
const Comment= require('../models/comment');
const User = require('../models/user');
module.exports.create=async(req,res)=>{
    try {
                const user=await User.findById(req.user._id);
                let postCreated= await Post.create({
                    content:req.body.content,
                    user: req.user._id
                });
                postCreated= await Post.findById(postCreated._id).populate('user').exec();
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post:postCreated
                        },
                        message:'Post created !!'
                    })
                }
                // console.log(postCreated.content);
                req.flash('success','Post created Sucesssfull!');
                return res.redirect('back');
                
            
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

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:'Post Deleted!!'
                    })
                }
                req.flash('success', 'post and Associated commets Deleted')
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