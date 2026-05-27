import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { apiRequest } from '../utils/api'

import Button from './Button'

function UpdateProduct({ product }) {

 const [ name, setName ] = useState(product.name);
 const [ info, setInfo ] = useState(product.info);
 const [ price, setPrice ] = useState(product.price);
 const [ message, setMessage ] = useState('');

 useEffect(() => {
  setName(product.name);
  setInfo(product.info);
  setPrice(product.price);
 },[ product ])

 async function handleSubmit(event) {
  event.preventDefault();
  setMessage('Updating ...');
  const result = await apiRequest('PUT', '/api/product/'+product._id, {'Content-Type': 'application/json'}, { name, info, price });
  console.log('result : ',result);
  setMessage(result.message);
 }

 return(
<form className='shadow p-2 flex flex-col gap-3' onSubmit={handleSubmit} >
 <h2 className='text-2xl font-bold' > Update Product </h2>
 <span> <b> Name :</b> <input value={name}  onChange={(e) => setName(e.target.value)} className='border' type='text' /> </span>
 <span> <b> Info :</b> <textarea value={info}  onChange={(e) => setInfo(e.target.value)} className='border' type='text' /> </span>
 <span>  <b> Price :</b> <input value={price}  onChange={(e) => setPrice(e.target.value)} className='border' type='Number' /> </span>
 <Button text='Update Product' function={handleSubmit} />
 <p> {message} </p>
</form>
)

}

export default UpdateProduct;
