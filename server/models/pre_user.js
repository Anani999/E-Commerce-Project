import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const preUserSchema = new mongoose.Schema({
 otp: Number,
 username: {
  type: String,
  required: true,
  unique: true
 },
 email: { 
  type: String,
  required: true,
  unique: true
 },
 password: {
  type: String,
  required: true
 }
});

preUserSchema.pre('save', async function(){
 if(this.isModified('password')){
  console.log('password length : ',this.password.length);
  if(this.password.length < 5 || this.password.length > 50){ throw new Error('Password length is either short or long !'); return}
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
 }
});

const preUser = mongoose.model('preUser', preUserSchema)

export default preUser;
