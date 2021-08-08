const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const htmlToText = require('html-to-text');
const User = require('../model/user');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

class SendEmail {
  constructor(firstName, url) {
    this.to = user.email;
    this.fullName = user.fullName;
    this.url = url;
    this.from = 'domail <noreply@domain.org';
  }

  sendTransport() {
    if (process.env.NODE_ENV === "production") {
      // return nodemailer.createTransport(nodemailerOptions);
    }

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    console.log("Hi Email")
    const html = ejs.renderFile(
      path.join(__dirname, `../views/emails/${template}.ejs`),
      {
        fullName: this.fullName,
        url: this.url,
        subject
      }
    );

    //email options
    const message = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    //create transport and send email
    await this.sendTransport().sendMail(message);
  }

  // send user welcome message
  async sendWelcome() {
    
     await this.send('welcome', 'Welcome to Domain.com')
  }

  // send reset password message
  async passwordReset() {
    await this.send(
      "passwordReset", "Your password reset token (valid only for 10 minutes)"
    );
  }

  // email reset message
  async emailResetRequest(){
    await this.send("Email Reset Request", "Please comfirm if you are the one making this request (token valid for 10 minutes)")
  }

  
}

module.exports = SendEmail