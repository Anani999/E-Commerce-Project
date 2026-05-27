import { useState, useEffect } from 'react'
import { apiRequest } from '../utils/api.js'
import { useNavigate } from 'react-router-dom'


function Orders() {

 const [ orders, setOrders ] = useState([]);
 const [ message, setMessage ] = useState('');
 const navigate = useNavigate();
 
 async function fetchOrders() {
  const response = await apiRequest('GET', '/api/order/all', {}, );
  if(response.success === true) {
   setOrders(response.data.orders);
   return;
  }
  setMessage(response.message)
 }

 useEffect(() => {
  fetchOrders();
 }, []);

 function handleClick(id) {
  navigate('/order/'+id);
 }
 
 if(orders.length == 0  ){console.log(orders); return <p> Loading </p> }
 
 return(
<div>
 <h1 className='text-2xl font-bold text-center mb-4'> Orders </h1>
 <div className='flex flex-wrap justify-center gap-3'>

 {orders.map((order) => (
  <div onClick={() => handleClick(order._id)} className='shadow p-2 cursor-pointer'>
   <p> Product Id : {order.product} </p>
   <p> Custumer Id : {order.user} </p>
   <p> Payment Status : {order.paymentCompleted ? 'Completed' : 'Pending'} </p>
   <p> Order Status : {order.status} </p>
  </div>
 ))}

 </div>
</div>
 )

}

export default Orders;
