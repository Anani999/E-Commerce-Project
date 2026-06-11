import { verifyCaptcha } from '../utils/auth.js'
import { badRequest } from '../utils/apiResponse.js'

function verifyReCaptcha(action) {
 return async(req, res, next) => {
  const token = req.headers.token;
  if(!token) return badRequest(res);
  const result = await verifyCaptcha(token, action);
  if(result.success !== true) return badRequest(res);
  if(result.score < 0.7) return badRequest(res, 'Suspecious request');
  next(); 
 }
}


export default verifyReCaptcha;
