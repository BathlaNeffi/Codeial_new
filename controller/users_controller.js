const User = require('../models/user');
const fs= require('fs');
const path= require('path');
module.exports.users=async (req,res)=>{
    // res.end('<h1>Users Profile</h1>')
    const user= await User.findById(req.params.id);
    return res.render('user_profile',{
        title:"Profile",
        profile_user:user
    })
}
// user update

module.exports.update= async(req,res)=>{
    try {
        if(req.user.id==req.params.id){
            // const user= await User.findByIdAndUpdate(req.params.id,{name: req.body.name,email:req.body.email});
            // if(user){
            //     return res.redirect('back');
            // }

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){ console.log('**************multer Eroor: ', err)};
                // console.log(req.file);
                user.name= req.body.name;
                user.email= req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    // this is saving the path  of the uploaded file into the avatar  filed  in the user
                    user.avatar = User.avatarPath +'/'+ req.file.filename
                }
                user.save();
                return res.redirect('back');
            })
        }else{
            return res.status(401).send('Unauthorized');
        }
       
    } catch (error) {
        console.log(error);
    }
}




// render the Sign-In page

module.exports.signIn=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
   return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    });
}
// render the Sign-Up page
module.exports.signUp=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
   return res.render('user_sign_up',{
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
    req.flash('success','Logged in sucessfully!!');
    return res.redirect('/');
}

// making action for signout

module.exports.destroySession=async (req,res)=>{
    try {
        await req.logout( (err)=>{
        
            if(err){console.log(err);
            }
            req.flash('success','You have LoggedOut!!');
            return res.redirect('/');
        })
        
    } catch (error) {
        console.log('error' ,error);
        
    }

    
};


