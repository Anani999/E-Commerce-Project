import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBar from './SearchBar'
import logo from '../assets/images/logo.png'

function Navbar () {
 const {isAuthenticated, user} = useSelector((state) => state.auth);
 return (
  <div className='flex items-center shadow p-3 justify-evenly'>
   <Link to='/'>
    <div className='flex items-center'>
     <img src={logo} className='w-30 h-20' />
     <b className='text-2xl'> Garuda Club </b>
    </div> 
   </Link>
   <Link to='/'> <b> Home </b> </Link>
   <SearchBar />
   {isAuthenticated ? <Link to='/account' > <b> Account </b>  </Link> : <Link to='/login'> <b> Login </b> </Link> }
  </div>
 );

}

export default Navbar;
