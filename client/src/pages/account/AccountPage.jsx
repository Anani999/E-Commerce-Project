import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import defaultImage from '../../assets/images/profile.png'
import Button from '../../components/Button'
import { apiRequest } from '../../utils/api'
import { logout } from '../../context/authSlice'

function Account() {

 const dispatch = useDispatch();

 const user = useSelector((state) => state.auth.user);
 let image;
 if(user.image){ image = user.image} else{ image= defaultImage}


 async function handleLogout() {
  const response = await apiRequest('POST', '/api/auth/logout');
  if(response.success === true){
   dispatch(logout());
  } else {
   alert('Logout Failed : '+response.message);
  }
 }


return(
<div className='m-2 flex flex-col gap-2 items-start'>

 <div className='flex gap-5 m-2 border border-gray-500 rounded'>
  <img src={image} className='h-20 w-20 rounded' />
  <div className='flex flex-col gap-2'>
   <b> {user.username} </b>
   <p> {user.email} </p>
   <p> {user.verified ? 'Verified' : 'Not Verified'} </p>
  </div>
 </div>

 <Link to='/account/orders'> <p className='text-red-500 border rounded p-1 w-30 flex justify-center'> My Orders </p> </Link>
 <Link to='/account/sessions'> <p className='text-black border rounded p-1 w-30 flex justify-center'> Active Sessions </p> </Link>
 <Button text='Logout' function={handleLogout} />
</div>
);
}


export default Account;
