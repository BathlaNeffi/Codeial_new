const Post = require('../models/post');
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