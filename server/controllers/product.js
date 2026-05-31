import {uploadToCloudinary, deleteLocalFile} from '../utils.js'
import { unAuthorized, success, badRequest, serverError } from '../utils/apiResponse.js'
import Product from '../models/product.js'
import devLog from '../utils/env.js'


// [ CONTROLLER CREATE PRODUCT ]
async function createProduct(req, res){

 if(!req.body){  return badRequest(res, 'Bad content type')};
 const env = process.env.ENV;
 
 const {name, info, price} = req.body;
 const file = req.file

 // checking all things are got
 if(!name || !info || !price || !file){ return badRequest(res, 'required things missing')};

 devLog('Triggered Create Product with name : '+name, env);

 // uploading the file to the cloudinary
 const upload_file = await uploadToCloudinary(process.cwd()+'/'+file.path);

 // deleting the file after upload to cloudinary
 deleteLocalFile(file.path);

 // creating the product with given fields 
 const product = new Product({name, info, price, image:upload_file.secure_url});
 product.save();

 devLog('New Product added with name : ' + product.name, env);

 // responding with success and with the product 
 success(res, 'Product created successfully !', {product});

}



//   ----------------------------   //
// [ CONTROLLER GET PRODUCT BY ID ] //
//   ----------------------------   //
async function getProductById(req, res){

 const id =  req.params.id
 if(!id){ return badRequest(res, 'id is needed ') }

 const product = await Product.findById(id);
 if(!product) { return badRequest(res, 'Product not found') }

 success(res, 'Product fetched !', {product})
}



// [ CONTROLLER GET PRODUCTS ]
async function getProducts( req, res){
 const totalProducts = await Product.countDocuments();
 const pageSize = 10
 const pages = Math.ceil(totalProducts/pageSize)
 const page = req.query.page || 1;
 const skips = (page - 1) * pageSize

 const products = await Product.find().skip(skips).limit(pageSize);
 const data = {products, pages, totalProducts}
 
 success(res, 'Products fetched successfully !', data);
}

export { createProduct, getProductById, getProducts};



// [ CONTROLLER DELETE PRODUCT ]
export async function deleteProduct(req, res) {
 const id = req.params.id;
 const env = process.env.ENV;
 await Product.findByIdAndDelete(id);
 devLog('One Product deleted with id : '+id, env);
 success(res, 'Product deleted !');
}



// [ UPDATE PRODUCT CONTROLLER ]
export async function updateProduct (req, res) {
 const id = req.params.id;
 const { name, info, price } = req.body;
 const env = process.env.ENV;
 const updated_product = await Product.findByIdAndUpdate(id, { name, info, price });
 return  success( res, 'Product Updated !', { product:updated_product });
}


export async function searchProducts (req, res) {
 const name = req.query.name;
 if(!name | name == '') { return badRequest(res, 'Name is required !') }
 const products = await Product.find({
  name: {
   $regex: name,
   $options: 'i'
  }
 });
 return success(res, 'Query Performed', {products});
};
