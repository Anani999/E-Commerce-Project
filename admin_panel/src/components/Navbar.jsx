import profile_pic from '../assets/images/profile.png'
import Button from './Button.jsx'

function Navbar({ barTogle, user, handleLogout }) {

 function handleTogle(){
   barTogle();
 };

 return(
<div className='flex justify-between w-[100%] p-3 shadow'>

 <div className='flex items-center gap-5 ml-3'>
  <div className='flex flex-col gap-2 cursor-pointer' onClick={handleTogle} >
   <div className='w-8 h-1 rounded bg-black'> </div>
   <div className='w-8 h-1 rounded bg-black'> </div>
   <div className='w-8 h-1 rounded bg-black'> </div>
  </div>
  <p className='text-3xl '> Dashboard </p>
 </div>

 <div className='flex items-center gap-3 mr-3'>
  { user.image ? (
    <img className='w-12 h-12 border cursor-pointer rounded-3xl' src={user.image} />
   ) : (
    <img className='w-12 h-12 border cursor-pointer rounded-3xl' src={profile_pic} />
   ) } 
  <b className='text-1xl'> {user.username} </b>
  <Button text='Logout' function={handleLogout} />
 </div>

</div>
)
}

export default Navbar;
