const Post= require('../../../models/post');
const Comment= require('../../../models/comment');
module.exports.index=async(req,res)=>{

    const posts = await Post.find({}).sort('-createdAt').populate('user').populate({path:'comments', populate:{path:'user'}}).exec();

    return res.status(200).json({
        data:{
            posts:posts
        },
        message:"List of posts"
    })
};

module.exports.destroy= async(req,res)=>{
    try {
        
        const post= await Post.findById(req.params.id);
        
            if(post.user == req.user.id){
                await Post.deleteOne({_id:req.params.id});
                

                await Comment.deleteMany({ post: req.params.id});

                return res.json(200,{
                    message:"Post and associated comments deleted"
                })
            
            
           
                }
                else{
                       return res.json(401,{
                        message:'you can not delete this post'
                       })  
                }
    } catch (error) {
      return res.status(500).json({
        message:"Internal Server Error"
       })
    }
}