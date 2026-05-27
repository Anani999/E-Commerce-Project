import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, 'username is required'],
  minLength:5,
  maxLength:15
 },
 email: { 
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  match: [/.+\@.+\..+/, 'Please enter a valid email'],
  maxLength: 50,
  minLength: 5,
 },
 password:{
  type: String,
  select: false,
  required: true,
 },
 verified:{
  type: Boolean,
  default: false
 },
 userType:{
  type: "String",
  default: "user",
  enum: ["user", "admin"]
 }
});

userSchema.index({username: 1}, {unique:true});
userSchema.index({email: 1}, {unique: true});


const User = mongoose.model('User', userSchema);

export default User;
