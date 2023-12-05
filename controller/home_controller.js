const Post = require('../models/post');
module.exports.home=async (req,res)=>{
    // res.send('<h1>Express Server is Up and running in Codeial!!</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // res.clearCookie('userId');
        const posts = await Post.find({}).populate('user').populate({path:'comments',populate:{path:'user'}}).exec();
        return res.render('home',{
            title:"Codeial | Home",
            wallPost: posts
        });
    
    
}