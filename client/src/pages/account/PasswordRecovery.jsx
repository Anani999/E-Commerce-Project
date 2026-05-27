import { useState } from 'react'
import apiRequest from '../../utils/api.js'
import Loading from '../../components/Loading'

function PR() {
 const [message, setMessage] = useState('');
 const [email, setEmail] = useState('')
 const [loading, setLoading] = useState(false);
 
 async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  const response = await apiRequest('POST', '/api/auth/recover-password', {}, {email} );
  setMessage(response.message);
  setLoading(false);
 } 

 return(
  <div className='m-auto w-300 mt-10 shadow flex flex-col items-center gap-2'>
   {loading && <Loading message='One Movement ...' pop='true'/> }
   <h1 className='text-2xl font-bold'> Password Recovery </h1>
   <p> Enter your email </p>
   <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
    <button className='rounded p-1 bg-blue-700 text-white cursor-pointer' type='submit' > Enter </button>
   </form> 
   <p> {message} </p> 
  </div> 
 );
}


export default PR;
