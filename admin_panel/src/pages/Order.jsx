import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { apiRequest } from '../utils/api.js'

import Button from '../components/Button'



function Order() {

 const { id } = useParams();
 const [order, setOrder] = useState({});
 const [orderStatus, setOrderStatus] = useState('');
 const [message, setMessage] = useState('');

 async function fetchOrder() {
  console.log('triggered !');
  const response = await apiRequest('GET', '/api/order/'+id, {});
  if (response.success === true) {
   setOrder(response.data.order);
   setOrderStatus(response.data.order.status);
   return;
  }
  setMessage(response.message);
 }

 useEffect(() => {
  fetchOrder();
 },[]);

 async function handleUpdate(){
  const response = await apiRequest('PUT', '/api/order/'+order._id, {}, {status: orderStatus});
  setMessage(response.message);
 }

 if(!order._id) { return <p> Loading </p> }

 return(
<div className='flex items-center gap-10'>
 <img src={order.product.image} alt={order.product.name} className='w-100 h-100'/>
 <div>
  <p> <b> Order id :</b> {order._id} </p>
  <p> <b> Product Name :</b> {order.product.name} </p>
  <p> <b> Customer Name :</b> {order.user.username} </p>
  <p> <b> Price  :</b> {order.product.price} </p>
  <p> <b>Payment Status :</b> {order.paymentCompleted ? 'Payment Successfull' : 'Pending'} </p>

  <b> Update Order Status </b>
  <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='border p-1 m-1' >
   <option value='arriving' > Arriving </option>
   <option value='dispatched' > Dispatched </option>
   <option value='delivered' > Delivered </option>
  </select>

  <Button text='Update Status' function={handleUpdate} />
  <p> {message} </p>
 </div>
</div>
 );

}


export default Order;
