const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create=async (req,res)=>{
    try {
        const post= await Post.findById(req.body.post);
        if(post){
            let commentCreated= await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
               
                post.comments.push(commentCreated);
                post.save();

                if (req.xhr){
                    // Similar for comments to fetch the user's id!
                    commentCreated = await Comment.findById(commentCreated.id).populate('user').exec();
        
                    return res.status(200).json({
                        data: {
                            comment: commentCreated
                        },
                        message: "Post created!"
                    });
                }

                return res.redirect('back');
            
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


                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
                return res.redirect('back');
            }
        }else{
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log(error);
    }
}
