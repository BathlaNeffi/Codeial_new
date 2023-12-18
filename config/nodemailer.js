const nodemailer = require("nodemailer");
const path= require('path');
const ejs = require('ejs');
const env= require('./environment');

let transporter = nodemailer.createTransport(env.smtp);

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

