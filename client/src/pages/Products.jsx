import { useState, useEffect } from 'react'
import { apiRequest } from '../utils/api.js'
import { useNavigate } from 'react-router-dom'

import Loading from '../components/Loading'
import Button from '../components/Button'
import SearchBar from '../components/SearchBar'

function Products () {

 const [products, setProducts] = useState([]);
 const [pages, setPages] = useState(0);
 const [page, setPage] = useState(1);
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');
 
 useEffect(() => {
  fetchProducts();
  console.log('Products Page rendering')
 },[page]);

 async function fetchProducts () {
  setLoading(true);
  const response = await apiRequest('GET', `/api/product?page=${page}`);
  setLoading(false);
  if(response.success === true){
   setProducts(response.data.products);
  } else { setMessage(response.message) };
  setPages(response.data.pages);
 }

 const navigate = useNavigate();

 function handleClick(id) {
  navigate('/product/'+id);
 }

 if(loading){
  return ( <Loading message='Fetching Products ...' /> );
 }

 return (
  <div className='flex flex-col items-center gap-3 m-3'>  
   <div className='flex flex-wrap items-center justify-center p-2 gap-3'>
   {products.map((product) => (
    <div className=' flex flex-col items-center border border-gray-500 rounded p-1 cursor-pointer' onClick={() => handleClick(product._id)} key={product._id}>
     <img className='w-45 h-40 rounded' src={product.image} alt={product.name} />
     <p> {product.name} </p>
     <b> {product.price} Rs </b>
    </div>
   ))}
   </div>

   <div className='flex items-center flex-col mt-2'>
    <div> Pages </div>

    <div className='flex gap-2 items-center'>
     {Array.from( {length:pages}, (_, i) => (
      <div key={i} className='p-2 bg-gray-900 text-white cursor-pointer' onClick={() => setPage(i+1)} > {i+1} </div>
     ))}
    </div> 
   </div> 
  <p> {message} </p>
  </div>
 );

}


export default Products;
