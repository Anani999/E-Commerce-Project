import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import apiRequest from '../utils/api'
import Logo from '../components/Logo'
import Loading from '../components/Loading'

function Register() {
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [email, setEmail] = useState('')
 const [otp, setOtp] = useState(0);
 const [showOtp, setShowOtp] = useState(false);
 const [message, setMessage] = useState('')
 const [loading, setLoading] = useState(false);

 const navigate = useNavigate();

 async function handleSubmit(event) {
  event.preventDefault();
  setLoading(true);
  window.grecaptcha.enterprise.ready(() => console.log('site loaded'));
  const token = await window.grecaptcha.enterprise.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'REGISTER' });
  const response = await apiRequest('POST', '/api/auth/register', {}, { username, password, email, token });
  setMessage(response.message);
  setLoading(false)
  if(response.success === true){
   setShowOtp(true)
  } else{ setMessage(response.message) };
 }

 async function handleOtpSubmit() {
  const response = await apiRequest('POST', '/api/auth/verify-otp', {}, { email, username,  otp });
  setMessage(response.message);
  if(response.success === true){
   navigate('/login');
  } else { setMessage(response.message) }
 }

 return(
  <div> <Logo/>
  {loading && <Loading pop='true' />}
  <div className='border border-gray-300 rounded p-2 m-auto flex flex-col gap-2 items-center' >
   <h1 className='text-2xl font-bold'> Register </h1>
   <form className='flex flex-col gap-2 items-center' onSubmit={handleSubmit }>
    <input className='border p-1 rounded'  type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
    <input  className='border p-1 rounded' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
    <input className='border p-1 rounded' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
    <button className='p-1 bg-blue-800 text-white font-bold border rounded cursor-pointer' type='submit' >  Register </button>
   </form>
   {showOtp && (
    <div>
     <input type='number' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP' />
     <button className='p-1 bg-gray-600' onClick={handleOtpSubmit} > Verify Otp </button>
    </div>
   )}
   <p> {message} </p>
   <span className='text-gray-500'> Already had account ? <Link to='/login'> <b className='text-green-500'>Login</b> </Link> </span>
  </div>
  </div>
 );

}

export default Register;
