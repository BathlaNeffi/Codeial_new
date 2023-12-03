const User = require('../models/user');
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

// { <field>: { $eq: <value> } }

// Action for user create
module.exports.create= async (req,res)=>{
    try{
        if(req.body.password!==req.body.confirmPassword){
            return res.redirect('back');
        };
        const user=await User.findOne({email: req.body.email});
            if(!user){
                const userCreated=await User.create(req.body);
                
                    if(userCreated){
                        return res.redirect('/users/sign-in');
                    }
                    
                } else{
                    console.log('user Already Exist');
                return res.redirect('back');
            }
    }catch(err){
        console.log(err,'Error in Signup function');
    }
    
}

// action for create Session
module.exports.createSession=(req,res)=>{
    return res.redirect('/');
}