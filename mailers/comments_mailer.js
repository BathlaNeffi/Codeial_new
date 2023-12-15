const nodeMailer= require('../config/nodemailer');

module.exports.newComment= async (comment)=>{
    console.log('inside newComment Mailer');
    let htmlString= await nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')


    nodeMailer.transporter.sendMail({
        from:'neffi@neffi',
        to:comment.user.email,
        subject:"New Comment Published!",
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
