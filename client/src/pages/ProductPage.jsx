import { useParams, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { apiRequest } from '../utils/api.js'
import Button from '../components/Button'
import Loading from '../components/Loading'

function ProductPage () {

 const user = useSelector((state) => state.auth.user);
 const { id } = useParams();
 const [product, setProduct] = useState({});
 const [message, setMessage] = useState('');
 const [load, setLoad] = useState({loading: false, message:''});
 const navigate = useNavigate();

 useEffect(() => {
  fetchProduct();
 }, []);

 async function fetchProduct() {
  const response = await apiRequest('GET', '/api/product/'+id);
  setProduct(response.data.product);
 }

 function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
     resolve(true);
    };
    script.onerror = () => {
     resolve(false);
    };
    document.body.appendChild(script);
  });
 }


 async function handleBuy() {
  navigate('/create-order/'+id)
  return
  setLoad({loading: true, message:'Initiating Purchase ...'});
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if(!res) {
   console.error('Razor Pay SDK failed to load');
   alert('Network Error, are you Online ?');
   setLoad({loading: false, message:''})
   return;
  };

  console.log('initiated to buy product : ', product.name);
  const result = await apiRequest('POST', '/api/order', {'Content-Type':'application/json'}, {  amount:product.price, currency: 'INR', receipt:'receipt-for-'+user._id, notes:{} });
  const razor_order = result.data.razor_order;
  
  const options  = {
      key: "rzp_test_So8r5su2KE6vkG",
      amount: product.price * 100, // Amount in paise
      currency: "INR",
      name: "Sagar Company Private Ltd",
      description: "Test Transaction",
      order_id: razor_order.id, // Generate order_id on server
      handler: async function(response){
        const data = response;
        data.product = product;
        data.razor_order = razor_order;
        const result = await apiRequest('POST', '/api/order/verify-payment', {'Content-Type': 'application/json'}, {data} );
        setMessage(result.message);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoad({loading: false, message:''})

 }

 if (!product._id) {
  return <Loading message='One movement ...' />
 } else {
  return(
   <div className='flex items-center gap-4 w-250 m-auto mt-10'>
    <img src={product.image} className='w-120 h-120' />
    <div className='flex flex-col gap-3 items-start'>
     <h1 className='text-3xl font-bold'> {product.name} </h1>
     <p> {product.info} </p>
     <b className='text-2xl'> {product.price} Rs </b>
     <Button text='Buy Now' function={handleBuy} />
     <p> {message} </p>
    </div>

    {load.loading && <Loading message='Initiating Purchase ...' pop='true' />}

   </div>
  );
 }
}

export default ProductPage;
