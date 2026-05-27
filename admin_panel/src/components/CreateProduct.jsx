import default_profile from '../assets/images/placeholder_image.png'
import { useState, useRef } from 'react'
import Button  from './Button'
import devLog from '../utils/env'
import { postRequest } from '../utils/api'

function CreateProduct () {

 const [image, setImage] = useState('');
 const [imageUrl, setImageUrl] = useState(default_profile);
 const [name, setName] = useState('');
 const [info, setInfo] = useState('');
 const [price, setPrice] = useState('');
 const fileRef = useRef(null);
 const [ message, setMessage ] = useState('');
 
 function handleUpload () {
  console.log('triggered Upload ');
  fileRef.current.click();
 }

 function handleFileChange (event) {
  const file = event.target.files[0];;
  setImage(file)
  devLog('file changed : ' + JSON.stringify(file));
  const url = URL.createObjectURL(file);
  setImageUrl(url)
 }

 async function handleCreateProduct () {
  devLog(`Image : ${image}\n Name: ${name} \n Info: ${info} \n Price: ${price}\n Were set to create product`)
  const form = new FormData();
  form.append('image', image);
  form.append('name', name);
  form.append('info', info);
  form.append('price', price);
  
  setMessage('Creating Product ...')
  const result = await postRequest('/api/product', {}, form);
  devLog('Product Create Result  : '+JSON.stringify(result));
  setMessage(result.message);
 }

 return(

<div className='shadow p-2'>
<h1 className='text-2xl font-bold '> Create Product </h1>
<div className='p-2 flex items-center gap-3'>
 
 <div className='flex flex-col gap-2 items-center' >
  <img className='w-30 h-30 rounded-2xl' src={imageUrl} />
  <Button text='Upload' function={handleUpload} />
 </div>

 <div className='flex items-start flex-col gap-2' >
  <input className='border max-w-48 hidden' ref={fileRef} onChange={handleFileChange} type='file' accept='image/*' />
  <input className='border' placeholder='Name of Product' type='text' value={name} onChange={(e) => setName(e.target.value)} />
  <input className='border'  placeholder='Info about Product' type='text' value={info} onChange={(e) => setInfo(e.target.value)} />
  <input className='border' placeholder='Price' type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
  <Button text='Create Product' function={handleCreateProduct} />
 </div>

</div>
<p> {message} </p>
</div>
);
}

export default CreateProduct;
