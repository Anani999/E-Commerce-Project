import { useDispatch } from 'react-redux'
import { update } from '../context/authSlice'

export async function checkAuth(dispatch){
 dispatch(update({type:'LOADING'}));
 const user = localStorage.getItem('user');
 if(!user){
  dispatch({type:"ERROR", payload:'Not Authenticated !'});
  return false
 }
 dispatch({type:"LOGIN", payload:user});
 return user
 
}




async function checkToken(token){
 try{
  const response = await getRequest('/api/user', {'Authorization': 'bearer '+token});
  if(response.success !== true){
   return false
  }
  return response;
 } catch (err) {
  console.error('Error while checking token : ',err);
 }
}
