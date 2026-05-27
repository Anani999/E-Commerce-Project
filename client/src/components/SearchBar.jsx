import { useState } from 'react'
import { apiRequest } from '../utils/api.js'
import Button from './Button'


function SearchBar({setResult}) {
 
 const [searchTerm, setSearchTerm] = useState('');
 const [message, setMessage] = useState('');
 
 async function handleSearch(){
  if(!searchTerm) {alert('Type something ')}
  const response = await apiRequest('GET', '/api/product/search?name='+searchTerm);
  if(response.success === true){
   setResult(response.data.products)
  } else { setMessage(response.message) }
 }

 async function handleClear() {
  setSearchTerm('');
  const response = await apiRequest('GET', '/api/product?page=1&size=10');
  if(response.success === true){
   setResult(response.data.products);
  } else { setMessage(response.message) }
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
