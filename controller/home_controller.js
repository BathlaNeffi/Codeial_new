module.exports.home=(req,res)=>{
    // res.send('<h1>Express Server is Up and running in Codeial!!</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // res.clearCookie('userId');
    return res.render('home',{
        title:"Home"
    })
}