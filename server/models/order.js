import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({

 product: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Product',
  required: true
 },

 user : {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
 },

 paymentCompleted: {
  type: Boolean,
  default: false,
 },

 status: {
  type: String,
  default: 'payment-pending',
  enum: ['payment-pending', 'payment-completed', 'packing', 'dispatched', 'reached-nearby-store', 'out-for-delivery', 'delivered', 'returned', 'cancelled']
 }, 
 
 amount: Number,
 payment_id: String,
 units: Number,
 address: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Address'
 }

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
