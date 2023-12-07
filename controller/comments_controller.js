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
};

module.exports.destroy= async(req,res)=>{
    try {

        const comment= await Comment.findById(req.params.id);
        if(comment){
            if(comment.user==req.user.id){
                const postId=comment.post;
                await Comment.deleteOne({_id : comment.id});
                await Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});
                return res.redirect('back');
            }
        }else{
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log(error);
    }
}
