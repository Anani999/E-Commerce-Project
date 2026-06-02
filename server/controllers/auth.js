import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import PreUser from '../models/pre_user.js'
import Session from '../models/session.js'
import {success, serverError, badRequest} from '../utils/apiResponse.js'
import devLog from '../utils/env.js'
import sendMail from '../services/mail.js'
import { genOtp } from '../utils/helper.js'
import geo_ip from 'geoip-lite'
import crypto from 'crypto'
import { verifyCaptcha } from '../utils/auth.js'


async function registerUser(req,res){
 const env = process.env.ENV;
 if(!req.body) { return badRequest(res, 'Invalid body type!') }
 const {email, username, otp} = req.body;
 if(!email || !otp || !username){
  return res.status(400).json({success:false, message:'email, otp or token missing'});
 }
 const preUser = await PreUser.findOne({ email, username });
 if(!preUser) { return badRequest(res, 'No OTP sent to email : '+email) }
 if(Number(otp) !== Number(preUser.otp)) { return badRequest(res, 'Wrong OTP')}
 devLog('Triggered Register for user : '+req.body.username, env);
 // check if user already existed with username or email
 const email_user = await User.findOne({email});
 const username_user = await User.findOne({username:preUser.username});
 if(email_user || username_user){
  return res.status(400).json({success: false, message:'given username or email already used !'})
 }
 // create new user 
 const user = await User.create({username: preUser.username, email: preUser.email, password: preUser.password, verified: true});
 const sendGreetings = await sendMail(user.email, 'Thanks for registering account in ABC company', `Hi ${email} \n welcome to ABC company\n your account registration completed and you can order products from now \n thank you for choosing our services`)
 devLog('New User Registered ! '+ user.username, env)
 // sending response
 return res.status(200).json({success: true, message:'User registered successfully !', data:{user} });
}


export async function createPreUser (req, res) {
 try{
  const { username, password, email, token } = req.body
  if(!username | !password | !email | !token) { return badRequest(res, 'Required things missing username, email, token') }  
  if(username.length < 5) { return badRequest('short username must atleast 5 characters') }
  
  const v_captcha = await verifyCaptcha(token , 'REGISTER');
  if(v_captcha.success !== true) return badRequest(res, 'Invalid Request');
  if(v_captcha.score < 0.7) return badRequest(res, 'Invalid request');

  const existingUser = await User.findOne({
   $or: [
    { email },
    { username }
   ]
  });
  if(existingUser) { return badRequest(res, 'Username or email already used !')}
  var preUser = await PreUser.findOne({ email, username });
  if(preUser){
   const isPasswordCorrect = await bcrypt.compare(password, preUser.password)
   if(isPasswordCorrect !== true) {
    preUser = null
   }
  }
  if(!preUser){
   const otp = genOtp()
   preUser = await PreUser.create({ username, email, password, otp });
  }
  const sendOtp = await sendMail(preUser.email, 'Verification OTP', `Hi ${preUser.username}\n Your OTP for registration is ${preUser.otp}`)
  if(sendOtp.success !== true){
   return serverError(res); 
  }
  return success(res, 'OTP sent to '+preUser.email);

 }catch(error) {
  switch (error.message){
   case 'Password length is either short or long !':
    return badRequest(res, 'Password length is either short or long !')
   break;
   default:
    console.error('Error at Create Pre User : ', error.message);
    return serverError(res)
  }
 }
}



// [ LOGIN USER CONTROLLER ] 
async function loginUser(req,res){

 const env = process.env.ENV;

 if(!req.body) return badRequest(res, 'invalid request type');
 const { username, password, token } = req.body;

 if(!username || !password || !token){ return badRequest(res, 'username, passowrd and token required!') };

 const score = await verifyCaptcha(token, 'LOGIN');
 if(score.success !== true) return badRequest(res, 'Invalid request');
 if(score.score < 0.7) return badRequest(res, 'Invalid request');

 devLog('Triggered Login for User : '+req.body.username, env);

 //check user existed 
 const user = await User.findOne({username}).select('username password email');
 if(!user){ return res.status(400).json({success: false, message: 'invalid username or password'})}

 // check password is correct
 const passCorrect = await bcrypt.compare(password, user.password);
 if(passCorrect !== true){return res.status(400).json({ success:false, message: 'invalid username or password'})};

 //create jwt token with user id 
 const jwt_token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:process.env.TOKEN_EXPIRY});

 let client_id = req.cookies.clientId;
 let session;
 if(!client_id){
  client_id = Date.now();
 }
 const user_agent = req.rawHeaders[3];
 const hashed_token = crypto.createHash('sha256').update(jwt_token).digest('hex');
 const clientIp = req.ip;
 session = await Session.findOneAndUpdate({ client_id: client_id, account: user._id }, { token: hashed_token, status: 'active' });
 const geo = geo_ip.lookup(clientIp);
 let location = {country: '', timezone: ''}
 if(geo){
  location = { country: geo.country, timezone: geo.timezone }
 }
 if(!session){
  session = await Session.create({ client_id, user_agent, token: hashed_token, account: user._id, location: location  });
 }
 devLog('Login success for user : '+user.username+ ' New token issued with expiry : '+process.env.TOKEN_EXPIRY, env);
 const sendAlert = await sendMail(user.email, 'New login to your account', `Some one is logged in to your account by your username is that you ?\n if not change your pass now !`)
 
 res.cookie('token', jwt_token, {httpOnly: true, secure: false, sameSite: 'lax', maxAge: 1 * 24 * 60 * 60 * 1000});
 res.cookie('clientId', client_id, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 365 * 24 * 60 * 60 * 1000 });
 res.status(200).json({ success: true, message:'Login Success !', data: { user}} );
}


export async function logout( req, res) {
 const client_id = req.cookies.clientId;
 if(!client_id) { return badRequest(res, 'Invalid request') }
 const session = await Session.findOne({ client_id, account: req.user._id });
 session.status = 'revoked';
 await session.save();
 res.clearCookie('token', { httpOnly: true, secure: false}).json({ success: true, message: 'Logout Success'});
}


export async function accountSessions( req, res) {
 const sessions = await Session.find({ account: req.user.id, status: 'active' });
 return success(res, 'Fetched user sessions', { sessions });
}

export async function revokeSession(req, res) {
 const id = req.query.id;
 console.log('User id : ', req.user.id);
 if(!id){ return badRequest(res, 'no session id found')}
 await Session.findOneAndUpdate({_id: id, account: req.user.id }, {status: 'revoked'});
 return success(res, 'Session '+id+' revoked !');
}


export async function recoverPassword(req, res) {
 const { email, token } = req.body;
 if(!email || !token) { return badRequest(res, 'Email and token required' )}

 const assessment = await verifyCaptcha(token, "PASSWORD_RECOVERY");
 if(assessment.status !== true) return badRequest(res, 'Not valid request');
 if(assessment.score < 0.7) return badRequest(res, 'Not valid request');

 const user = await User.findOne({ email });
 if(!user) { return badRequest(res, 'No account found' )};
 const jwt_token = await jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_FORGET_PASS_SECRET, { expiresIn: '5m'});
 const htmlContent = `<h1> Forget Password Recovery Link </h1> <br/> <p> Hi ${user.username} your link to reset password is below <br/> it's only valid for 5 minutes </p> <br/> <a href="${process.env.CLIENT_URL}/auth/new-password-form?token=${jwt_token}" > Reset Password </a>  `
 const sendLink = await sendMail(user.email, 'Password Recovery Mail', '', htmlContent);
 if(sendLink.success === true){
  success(res, 'Password Recovery email sent to '+email);
 }else { return serverError(res)}
}

export async function changePassword(req, res) {
 const {token, password} = req.body;
 if(!token | !password) { return badRequest(res, 'things missing !') }
 try{
  const decoded = await jwt.verify(token , process.env.JWT_FORGET_PASS_SECRET);
  const {_id, username} = decoded;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(_id, {password: hashedPassword});
  return success(res, 'user password updated successfully !');
 }catch(err){
  console.log(`error at changePass : `, err.message);
  return badRequest(res, 'Bad Request');
 }
}

export { registerUser, loginUser };
