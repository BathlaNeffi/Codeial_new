const User= require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession= async(req,res)=>{
    try {
        
        let user= await User.findOne({email: req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalida Username/Password"
            });
        }
        return res.status(200).json({
            message:"Sign in successfull please keep your token safe to login further",
            data:{
                token: jwt.sign(user.toJSON(),'codeial', {expiresIn: 100000})
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
    })
    }
}