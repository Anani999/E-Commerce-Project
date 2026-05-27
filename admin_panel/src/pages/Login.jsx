import { useDispatch } from 'react-redux'
import { loginUser } from '../context/authSlice'
import { useState } from 'react'

function Login({error}){
 const [ username, setUsername ] = useState('');
 const [ password, setPassword ] = useState('');
 const dispatch = useDispatch();

 function handleSubmit(e){
  e.preventDefault();
  dispatch(loginUser({username, password}))
 }

 return(
  <div className="m-auto w-[800px] flex flex-col items-center border-[5px] gap-5 mb-2 rounded-md mt-5 border-gray-500">
   <h1 className='text-3xl font-bold'> Login </h1> <br/>
   <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3 mb-5' >
    <input className='p-2 border rounded' type='text' required value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
    <input className='p-2 border' type='password' required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
    <button type='submit' className='p-2 w-[220px]  text-white font-bold cursor-pointer bg-blue-800 border rounded' > Login </button>
    {error && (<p className='text-red-500' > {error} </p>)}
   </form>
  </div>
 );
}


export default Login;
