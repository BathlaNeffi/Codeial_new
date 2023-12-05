const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create=async (req,res)=>{
    try {
        const post= await Post.findById(req.body.post);
        if(post){
            const commentCreated= await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
                if(commentCreated){
                post.comments.push(commentCreated);
                post.save();
                return res.redirect('back');
            }
        }
        

    } catch (error) {
        console.log(error);
    }
}
