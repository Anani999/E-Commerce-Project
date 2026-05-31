import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { loginUser} from '../context/authSlice.js'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Button from '../components/Button.jsx'
import Loading from '../components/Loading.jsx'
import Logo from '../components/Logo'

function Login () {

 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [ username, setUsername ] = useState('');
 const [ password, setPassword ] = useState('');
 const {error, isAuthenticated, loading } = useSelector((state) => state.auth);

 useEffect(() => {
  console.log('isAuth at login page : ',isAuthenticated)
  if(isAuthenticated === true){
    navigate('/')
  }
 },[isAuthenticated])

 function handleLogin() {
  dispatch( loginUser({ username, password }) );
 }

 return(
  <div> 
   <Logo/>
  <div className='  order border-gray-300 border rounded p-3 flex flex-col items-center m-auto gap-2' >
   {loading && <Loading pop='true' message='Authenticating ...' />}
   <h2 className='text-2xl font-bold' > Login </h2>
   <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} type='text' className='border border-gray-500 p-1 rounded' />
   <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}  type='password' className='border border-gray-500 p-1 rounded'/>
   <Button text='Login' function={handleLogin} />
   <span className='flex gap-2'> <p className='text-gray-500'> Not registerd yet ?</p> <Link to='/register'> <b className='text-green-500'> Register </b> </Link> </span>
   <Link to='/auth/password-recovery'> <b className='text-red-500'> Forgot Password ? </b> </Link>
   <p> {error} </p>
  </div>
  </div>
 )

}


export default Login;
