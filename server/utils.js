import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

function createToken(user_id){
 const token = jwt.sign({id: user_id}, process.env.JWT_SECRET , {expiresIn:'1h'});
 return token;
}

function validateToken(token){
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 return decoded;
}


async function uploadToCloudinary(file){
 const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true
 }

 try{
  //console.log(' here the things ',api_key, api_secret, cloud_name)
  const result = await cloudinary.uploader.upload(file, options);
  //console.log('Image uploaded to cloudinary : ', result)
  return result;
 }catch(error){
  console.log('An error while uploading file to cloudinary : ',error);
 }

}

 function deleteLocalFile(file){

  const file_path = process.cwd()+`/${file}`;
  fs.unlink(file_path, (err) => {
   if(err){
    console.error('Error occured : ',err);
    return
   }
   //console.log('File deleted successfully !');
  });
}

export {createToken, validateToken, uploadToCloudinary, deleteLocalFile}

//deleteLocalFile('product_images/2744862a87c52ef3f1620a1cb38d1d9d')
