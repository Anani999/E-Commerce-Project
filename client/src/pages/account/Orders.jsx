import { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api.js'

import Loading from '../../components/Loading'


function Orders() {

 const [orders, setOrders] = useState([]);
 const [message, setMessage] = useState('');
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  fetchOrders();
 },[]);

 async function fetchOrders() {
  setLoading(true);
  const response = await apiRequest('GET', '/api/order');
  setOrders(response.data.orders);
  setLoading(false);
  if(response.success === true){
   if(response.data.orders.length === 0){
    setMessage('No Orders created !');
  }else{
   setMessage(response.message);
  }
  }
 }

 if(loading){
  return <Loading message='Loading Orders ...' />
 }

 return (
<div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', gap:'5px', margin:'5px' }} >
 <h1 className='text-2xl font-bold'> My Orders </h1>

 {orders?.map((order) => (
 <div className='shadow p-2 rounded flex' key={order._id} >
  <div className='flex gap-3' style={{maxWidth:'300px'}}>
   <img style={{ width: '180px', height: '100px'}} src={order.product.image} alt={order.product.name} />
    <div>
     <b> {order.product.name} </b>
     <p> {order.product.info} </p>
    </div>
  </div>

  <div className='flex justify-evenly gap-3' style={{marginLeft:'15px'}}>
   <span> <b> Status </b> <p> {order.status} </p> </span>
   <span> <b> Payment </b> <p> { order.paymentCompleted ? "Done" : "Pending.." } </p> </span>
   <span> <b> Amount </b> <p> {order.amount} </p> </span>
   <span> <b> Units </b> <p> {order.units} </p> </span>
   <span> <b> Address </b> <p> {order.address.house | ''} |  {order.address.area | ''} |  {order.address.district | ''} </p> </span>
   <span> <b> Phone : {order.address.phone | ''}</b> </span>
  </div>

 </div>
 ))}
 <p> {message} </p>
</div>
 );
}


export default Orders;
