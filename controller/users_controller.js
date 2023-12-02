module.exports.users=(req,res)=>{
    // res.end('<h1>Users Profile</h1>')
    return res.render('user_profile',{
        title:"Neffi's Profile"
    })
}
// render the Sign-In page

module.exports.signIn=(req,res)=>{
    res.render('user_sign_in',{
        title:'Codeial | Sign In'
    });
}
// render the Sign-Up page
module.exports.signUp=(req,res)=>{
    res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    });
}

// Action for user create
module.exports.create=(req,res)=>{
    // To be done latter
}

// action for create Session
module.exports.createSession=(req,res)=>{
    // To de done latter
}