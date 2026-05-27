import crypto from 'crypto'
import Order from '../models/order.js'
import { badRequest, success } from '../utils/apiResponse.js'
import Razorpay from 'razorpay'

import sendMail from '../services/mail.js'



export async function createOrder( req, res) {
 const { amount, currency, receipt, notes } = req.body;

 const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
 });

 const options = {
  amount: amount * 100,
  currency,
  receipt,
  notes
 };

 const razor_order = await razorpay.orders.create(options);

 return success(res, 'Order Created !', {razor_order});
}



export async function updateOrderStatus (req, res) {
 const id = req.params.id;
 const { status } = req.body;
 const validStatus = ['dispatched', 'arriving', 'delivered'];
 const updatedOrder = await Order.findByIdAndUpdate(id, { status }).populate('user product');
 const sendUpdate = await sendMail(updatedOrder.user.email, 'Order update', `Your order ${updatedOrder.product.name} \n was updated to ${status} `)

 return success(res, 'Order Updated !', {updatedOrder});
}



export async function getOrders ( req, res) {
  const orders = await Order.find({ user: req.user.id }).populate('product');
  return success(res, 'Orders fetched successfully !', { orders });
}


export async function adminGetOrders( req, res) {
 const orders = await Order.find();
 return success(res, 'orders fetched successfully', {orders})
}



export async function getOrder ( req, res) {
 const { id } = req.params;

 if(!id){ return badRequest(res, 'Id is missing !')}

 const order = await Order.findById(id).populate('product user');
 if(!order) {
  return badRequest(res, 'No orders found with : '+id);
 }
 return success(res, 'Order fetched', { order });
}


export async function verifyPayment ( req, res) {
 const { razorpay_order_id, razorpay_payment_id, razorpay_signature,  razor_order, product, address, units } = req.body.data;

 if(!razorpay_order_id | !razorpay_payment_id | !razorpay_signature) { return badRequest(res, 'things required missing ')}; 
 const body = razorpay_order_id +"|" + razorpay_payment_id;

 //console.log('razor_order ',razor_order );

 const expectedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  .update(body.toString())
  .digest('hex');

 if(expectedSignature === razorpay_signature) {
  const order = await Order.create({
   paymentCompleted: true,
   product,
   user: req.user.id,
   payment_id: razorpay_payment_id,
   amount: Number(razor_order.amount)/100,   // convert from paise to rupees
   address,
   units,
   status: 'payment-completed'
  });
  await order.populate('user product');
  const sendInfo = await sendMail(order.user.email, 'Order successfully placed', `Hi ${order.user.username} \n your order ${units} ${order.product.name}\n was succesfully placed and the payment was completed \n it will soon dispatched and delivered accordingly \n thanks for using our services `);
  return success(res, 'Order Placed Successfull !');
 }
  return success(res, 'Payment was tampered !')
}
