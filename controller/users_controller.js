module.exports.users=(req,res)=>{
    // res.end('<h1>Users Profile</h1>')
    return res.render('user_profile',{
        title:"Neffi's Profile"
    })
}