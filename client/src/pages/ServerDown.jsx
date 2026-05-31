import image from '../assets/images/server_down.jpg'
import { toast } from 'react-toastify'

function Component() {
 console.log('Triggered server down comp');
 const notify = () => toast('Is it really good ? hmmm');
 return(
  <div className='w-400 m-auto mt-10 flex flex-col gap-3 items-center'>
   <img 
    src={image} 
    className='w-200 rounded'
   />
   <h2 className='font-bold text-2xl'> Server Was Down </h2>
   <p> Our team working to fix something, kindly wait sometime </p>
  </div>
 );
}


export default Component;
