const nodemailer = require("nodemailer");
const path= require('path');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "neffybathla@gmail.com",
    pass: "ckpq pfrq bojk oatx",
  },
});

let renderTemplate = async (data,relativePath)=>{
    try {
        let mainHtml= await ejs.renderFile(
            path.join(__dirname,'../views/mailers',relativePath),
            data
        )
        return mainHtml;
        
    } catch (error) {
        console.log('error in rendering Template',error);
    }   
};

module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}

