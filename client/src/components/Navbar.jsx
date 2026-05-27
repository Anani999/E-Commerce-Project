import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'

function Navbar () {

 return (
  <div className='flex items-center shadow p-3 justify-evenly'>
   <Link to='/'>
    <div className='flex items-center'>
     <img src={logo} className='w-30 h-20' />
     <b className='text-2xl'> Garuda Club </b>
    </div> 
   </Link>
   <Link to='/'> <b> Home </b> </Link>
   <b className='text-gray-500'> Cart </b>
   <Link to='/account' > <b className='text-gray-500' > Account </b> </Link>
  </div>
 );

}

export default Navbar;
