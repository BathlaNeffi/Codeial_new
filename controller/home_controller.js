module.exports.home=(req,res)=>{
    // res.send('<h1>Express Server is Up and running in Codeial!!</h1>');

    return res.render('home',{
        title:"Home"
    })
}