import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import apiRequest from '../../utils/api.js'
import { useSearchParams } from 'react-router-dom'

function Form() {
 const [searchParams, setSearchParams] = useSearchParams();
 const token = searchParams.get('token');
 const [newPassword, setNewPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [message, setMessage] = useState('');

 console.log('token : ', token);
 if(!token) {
  return alert('Invalid Operation')
 }

 async function handleSubmit(e){
  if(newPassword !== confirmPassword) { setMessage('Passwords not matched !'); return };
  e.preventDefault();
  const response = await apiRequest('POST', '/api/auth/change-password', {}, { token, password: newPassword });
  setMessage(response.message);
 }

 return(
  <div className='m-auto p-3 gap-3 mt-10 w-[1000px] flex flex-col items-center shadow'>
   <h1 className='text-2xl font-bold'> Set New Password </h1>
   <form onSubmit={handleSubmit} className='flex flex-col gap-1 items-start'>
    <input placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='border p-1' required />
    <input placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='border p-1' required />
    <button type='submit' className='p-2 bg-blue-700 rounded border'> Change Password </button>
   </form>
   <p> {message} </p>
  </div>
 );
}

export default Form;
