import {unAuthorized, badRequest} from '../utils/apiResponse.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import Session from '../models/session.js'
import crypto from 'crypto'

async function authMiddleware(req, res, next){
 if(!req.cookies){
  return badRequest(res, 'Cookies not included !')
 }
 console.log('Cookies : ', req.cookies);
 const token = req.cookies.token
 const clientId = req.cookies.clientId;
 // check if request has authorization header with value
 if(!token | !clientId){ return unAuthorized(res) };
 // check that the value has a gap , that tells it's in correct format ex: bearer token...
 //const has_gap = bearer_token.includes(' ');
 //if(has_gap == false) { return unAuthorized(res)}

 // extracting the token from the value
 //const token = bearer_token.split(' ')[1];
 try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const session = await Session.findOne({ token: hashedToken, client_id: clientId, status: 'active', account: user._id }).populate('account');
  if(!session) { return badRequest(res, 'Bad Auth') }
  req.user = user;
  next();
 }
 catch(error){
  //console.log(error.message)
  if(error.message == 'invalid signature' || error.message == 'jwt expired'){ return unAuthorized(res)}
  else if(error.message == 'jwt malformed' || error.message == 'jwt must be provided'){ return unAuthorized(res)}
 }
}

export function adminMiddleware( req, res, next){
 if(!req.user || req.user.userType !== 'admin'){ return unAuthorized(res)};
 next();
}

export default authMiddleware;
