module.exports.index=(req,res)=>{
    return res.json(200,{
        data:{
            posts:['array','array']
        },
        message:'This is lis of v2 posts'
    })
}