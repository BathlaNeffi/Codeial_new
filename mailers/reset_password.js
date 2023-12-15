const nodeMailer= require('../config/nodemailer');

module.exports.resetPassword= async (resetUser)=>{
    console.log('inside reset_password Mailer');
    let htmlString= await nodeMailer.renderTemplate({resetUser:resetUser},'/resetUser/new_resetUser.ejs')


    nodeMailer.transporter.sendMail({
        from:'neffi@neffi',
        to:resetUser.user.email,
        subject:"Reset your codeial password",
        html:htmlString,
    },(err,info)=>{
        if(err){
            console.log('Error in  sending  mail', err);
            return;
        }
        // console.log('Message Sent', info);
        return;
    }
    )
}
