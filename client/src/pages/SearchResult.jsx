import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import apiRequest from '../utils/api';
import Loading from '../components/Loading';

function Search() {
 const [searchParams, setSearchParams] = useSearchParams();
 const term = searchParams.get('term');
 const [message, setMessage] = useState('');
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
  if(!term) {
   alert('query term is required to search');
   setMessage('No search term provided');
   return;
  }
 }, []);

 useEffect(() => {
  fetchResult();
 }, [term])

 async function fetchResult() {
  setMessage('');
  setLoading(true);
  const response = await apiRequest('GET', '/api/product/search?name='+term);
  if(response.success === true) { 
   setProducts(response.data.products);
  }
  else { setMessage(response.message) }
  setLoading(false);
 }

 if(products.length === 0 && !loading) return <p className='w-100 m-auto mt-10'> No Products Found </p>

 return(
  <div className=' w-300 m-auto mt-2 p-2'> 
   <p>Search Results for : <b>{term}</b> </p>
   {loading && <Loading/> }
   <br/>
   <div className='flex flex-col gap-3 items-start items-center m-1'>

    {products.map((product) => (
     <div key={product._id} className='border border-gray-300 rounded p-1 flex gap-2 cursor-pointer items-center w-280 m-auto' onClick={() => navigate('/product/'+product._id)} >
      <img alt='image' src={product.image} className='h-80 w-90 rounded' />
      <div className='flex flex-col gap-1'>
        <h2 className='font-bold text-2xl'> {product.name} </h2>
        <p> {product.info} </p>
        <b> {product.price} </b>
      </div>
     </div>
    ))}

   </div>
   <p> {message} </p>
  </div>);
}

export default Search;
