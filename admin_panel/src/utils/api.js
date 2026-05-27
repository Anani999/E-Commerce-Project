import devLog from './env'

const base_url = 'http://localhost:5000'

export async function getRequest (url, headers) {
 try{
  const token = localStorage.getItem('token');
  let headers2 = {};
  if(token) {
   headers2 = { 'Authorization': 'bearer '+token}
  }
  const response = await fetch(base_url + url, {
   headers: {...headers, ...headers2 },
   credentials: 'include'
  });
  const result = await response.json();
  return result;
 } catch(err) {
  devLog('Error at getRequest : '+err.message)
  return({success: false, message: 'Error Occured : '+err.message})
 }
}


export async function postRequest (url, headers, body) {
 try{
  console.log('sending with body : ', body)
  const token = localStorage.getItem('token');
  let headers2 = {};
  if(token) {
   headers2 = { 'Authorization': 'bearer '+token}
  }
  const response = await fetch(base_url + url, {
   method: 'POST',
   credentials: 'include',
   headers: {...headers, ...headers2 },
   body:body
  });
  const result = await response.json();
  return result;
 } catch(err) {
  devLog('Error at getRequest : '+err.message)
  return({success: false, message: 'Error Occured : '+err.message})
 }
}


export async function apiRequest (method, url, headers, body) {
try{
  const token = localStorage.getItem('token');
  let headers2 = {};
  if(token) {
   headers2 = { 'Authorization': 'bearer '+token }
  }
  const response = await fetch(base_url + url, {
   method: method,
   credentials: 'include',
   headers: {...headers2 , ...headers, 'Content-Type':'application/json' },
   body: JSON.stringify(body)
  });
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json')
  if(!isJson) {
   return {message:'Invalid Request', success: false}
  }
  const result = await response.json();
  return result;
 } catch(err) {
  devLog('Error at apiRequest : '+err.message)
  return({success: false, message: 'Error Occured : '+err.message})
 }

}
