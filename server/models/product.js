import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
 name:{
  type: String,
  required: true,
  maxLength: 150
 },
 image: {
  type: String,
  required: true,
 },
 info:{
  type:String,
  maxLength: 500
 },
 price:{
  type:Number,
  required: true
 }
});

// Indexes
productSchema.index({name: 1})

const Product = mongoose.model('Product', productSchema);

export default Product;
