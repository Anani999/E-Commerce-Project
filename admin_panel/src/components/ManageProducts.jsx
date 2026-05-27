import Button from './Button'
import { useState, useEffect } from 'react'
import { getRequest, apiRequest } from '../utils/api'
import devLog from '../utils/env'
import Loading from './Loading'
import UpdateProduct from './UpdateProduct'

function CreateProduct() {

 const [ products, setProducts ] = useState([]);
 const [ message, setMessage ] = useState('');
 const [loading , setLoading] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const [pages, setPages] = useState(0)
 const [ selectedProduct, setSelectedProduct ] = useState('');

 function handleCreateButton() {
  console.log('Triggered Create New product button ');
 }
 
 async function fetchProducts() {
  setLoading(true);
  const result = await getRequest('/api/product?page='+currentPage);
  if(result.success !== true) {
   setErrorMessage(result.message);
   return;
  }
  devLog('Products fetch Response : '+JSON.stringify(result.data))
  setProducts(result.data.products);
  setPages(result.data.pages);
  
  setLoading(false)
 }

 useEffect(() => {
  fetchProducts();
 },[currentPage]);

 async function handleDelete(id){
  setMessage('One Moment ...');
  const response = await apiRequest('DELETE', '/api/product/'+id);
  console.log('response of delete : ',response);
  setMessage(response.message);
 }

return(
<div className='shadow p-2 flex flex-col items-start gap-2 relative' >
 <h1 className='text-2xl font-bold'>Products </h1>

 <div className='h-[350px] w-[450px] mt-3 flex items-center justify-center' >
  {products.length <= 0 ? ( 
   <Loading/>
   ) : (

   <div className='w-[100%]'> 
    {products.map((product) => (
     <div className='flex items-center gap-2 p-1 mb-3 shadow w-[100%] justify-between' key={JSON.stringify(product._id)}>
      <img className='h-25 w-30 rounded' src={product.image} />
      <h3 className='text-1xl'> {product.name} </h3>
      <p> Price : <b>{product.price} Rs</b> </p>
      <button onClick={() => handleDelete(product._id)} className='border rounded text-red-500 cursor-pointer' > Delete </button>
      <button  onClick={() => setSelectedProduct(product) } className=' border rounded text-blue-500 cursor-pointer' > Edit </button>
     </div>
    ))}
   </div>

  )}
 </div>

 <div className='flex flex-col items-center justify-center w-[100%]'>
  <b> Pages </b>

  <div className='flex text-white items-center gap-1 m-1 w-[100%] justify-center'>
   {Array.from({ length: pages}, (_, i) => (
    <div key={i} onClick={ () => {setProducts([]); setCurrentPage(i+1);} } className={`bg-gray-500 p-2 cursor-pointer ${currentPage === i + 1 ? 'bg-gray-900' : ''} `}> {i+1} </div>
   ))}
  </div>

 </div>
 
 <p> {message} </p>
 {selectedProduct && <UpdateProduct product={selectedProduct}/> }
</div>

)

}

export default CreateProduct;
