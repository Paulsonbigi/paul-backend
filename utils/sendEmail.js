const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const htmlToText = require('html-to-text');
const User = require('../model/user');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

class SendEmail {
  constructor(to, firstName, url, from) {
    this.to = User.email;
    this.firstName = User.firstName;
    this.url = url;
    this.from = 'domail <noreply@domain.org';
  }

 

  async send(template, subject) {
    const html = ejs.renderFile(
      path.join(__dirname, `../views/emails/${template}.ejs`),
      {
        firstName: this.fullName,
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
    await transporter.sendMail(message);
  }

  // send user welcome message
  async sendWelcome() {
     await this.send('welcome', 'Welcome to Domain.com')
  }

   // send reset password message
   async passwordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid only for 10 minutes)"
    );
  }
}

module.exports = SendEmail