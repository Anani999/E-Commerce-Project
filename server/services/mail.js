import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

async function sendMail(to, subject, text, html) {
 try{
  const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
   }
  });

  const result = await transporter.sendMail({to, subject, text, html});
  console.log('OTP sent successfully ID : ', result.messageId)
  return {success: true, result}

 } catch(err) {
  console.error('Critical Error at sendMail : ', err.message);
  return {success: false}
 }
}


export default sendMail;

// for testing instantly 
//const response = await sendMail('yourMail12@gmail.com', 'Testing... html', 'this is text', '<h1> This is heading </h1> <br/> <a href="https://google.com"> Goole </a> ');
//console.log(response);

