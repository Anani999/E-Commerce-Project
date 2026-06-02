import { useState, useEffect } from 'react';
import { useParams } from  'react-router-dom'
import { useSelector } from 'react-redux'
import apiRequest, { rawApiRequest } from '../utils/api.js'
import Button from '../components/Button'
import Loading from '../components/Loading'
import { loadScript } from '../utils/general.js'


function CreateOrder() {
 const { id } = useParams();
 const [product, setProduct] = useState({});
 const [pincode, setPincode] = useState(null);
 const [pincodeArea, setPinCodeArea] = useState(null);
 const [block, setBlock] = useState('');
 const [state, setState] = useState('');
 const [area, setArea] = useState('');
 const [house, setHouse] = useState('');
 const [message, setMessage] = useState('');
 const [units, setUnits] = useState(1);
 const orderAmount = product.price * units;
 const user = useSelector((state) => state.auth.user);
 const [load, setLoad] = useState({ loading: false, message: 'One movement'});

 useEffect(() => {
  fetchProduct();
 },[]);

 async function fetchProduct() {
  setLoad({loading: true});
  const response = await apiRequest('GET', '/api/product/'+id);
  setLoad({loading: false});
  if(response.success === true){
   setProduct(response.data.product);
  } else { setMessage(response.message) }
 }

 async function fetchAreaByPincode() {
  setLoad({loading: true, message: 'fetching block'})
  const result = await fetch('https://api.postalpincode.in/pincode/'+pincode);
  const response = await result.json();
  setLoad({loading: false})
  if(response[0].Status === "Success") {
   setBlock(response[0].PostOffice[0].Block);
   setState(response[0].PostOffice[0].State);
  } else {setMessage('No records found for the pincode')}
 }

 async function handleBuy() {
  setLoad({loading: true, message:'Initiating Purchase ...'});
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if(!res) {
   console.error('Razor Pay SDK failed to load');
   alert('Network Error, are you Online ?');
   setLoad({loading: false, message:''})
   return;
  };

  console.log('initiated to buy product : ', product.name, orderAmount);
  const result = await apiRequest('POST', '/api/order', {}, {  amount: orderAmount, currency: 'INR', receipt:'receipt-for-'+user._id, notes:{} });
  const razor_order = result.data.razor_order;

  const options  = {
      key: "rzp_test_So8r5su2KE6vkG",
      amount: orderAmount * 100, // Amount in paise
      currency: "INR",
      name: "Sagar Company Private Ltd",
      description: 'Payment for '+product.name,
      order_id: razor_order.id, // Generate order_id on server
      handler: async function(response){
        const data = response;
        data.product = product;
        data.razor_order = razor_order;
        data.address = { 
         pinCode: pincode,
         state,
         block,
         area,
         house
        },
        data.units = units;
        setLoad({loading: true, message: 'Confirming Payment'});
        const result = await apiRequest('POST', '/api/order/verify-payment', {'Content-Type': 'application/json'}, {data} );
        setMessage(result.message);
        setLoad({loading: false});
        navigate('/account/orders');
      },
      prefill: {
        name: user.username,
        email: user.email,
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoad({loading: false, message:''})

 }

 return(
  <div className='m-2 shadow w-300 m-auto flex flex-col items-center' >
   {load.loading && <Loading pop='true' message={load.message} /> }
   <h1 className='text-2xl font-bold'> New Order </h1>
   <img src={product.image} alt={product.name} className='w-50 h-50' />
   <p className='font-bold'> {product.name} </p>
   <span> Units : <input type='number' value={units} onChange={(e) => setUnits(e.target.value)} placeholder='Units' /> </span>
   <h2 className='font-bold text-1xl'> Address Info : </h2>
   <input type='number' required placeholder='Pin code' value={pincode} onChange={(e) => setPincode(e.target.value)} />
   <Button text='Fetch Details' function={fetchAreaByPincode} />
   <input type='text' required placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
   <input type='text' required placeholder='Block' value={block} onChange={(e) => setBlock(e.target.value)} />
   <input type='text' required placeholder='Area' value={area} onChange={(e) => setArea(e.target.value)} />
   <input type='text' required placeholder='House' value={house} onChange={(e) => setHouse(e.target.value)} />
   <b> Total Amount : {orderAmount} </b>
   <Button text='Continue' function={handleBuy} />
   <p> {message} </p>
  </div>
 );

}

export default CreateOrder;
