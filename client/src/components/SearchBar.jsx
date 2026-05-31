import { useState } from 'react'
import { apiRequest } from '../utils/api.js'
import { useNavigate } from 'react-router-dom'
import Button from './Button'


function SearchBar({setResult}) {
 
 const [searchTerm, setSearchTerm] = useState('');
 const [message, setMessage] = useState('');
 const navigate = useNavigate();
 
 async function handleSearch(){
  navigate('/search?term='+searchTerm);
  return
 }

 async function handleClear() {
  navigate('/');
 }

 return(
<div className='flex flex-col items-center gap-2 m-1'>
 <div className='flex items-center gap-2'>
  <input className='border p-2' placeholder='Search Products' type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  <Button text='Search' function={handleSearch} />
  <Button text='Clear' function={handleClear} />
 </div>
 <p> {message} </p>
</div>
 )

}

export default SearchBar;
