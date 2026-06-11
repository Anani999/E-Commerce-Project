import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan'
import rateLimiter from 'express-rate-limit'
import slowDown from 'express-slow-down'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import cookieParser from 'cookie-parser'


async function Configs(app){
 dotenv.config();
 
 // Logging middleware
 app.use(morgan('dev'));
 // middleware to auto parse json of responces 
 app.use(express.json());
 
 // cors setup
 app.use(cors({
  origin:['http://localhost:5174','http://localhost:5173', ],
  credentials: true
 }))
 app.use(cookieParser());
 app.set('trust proxy', 1)
 
 //rate limiting 
 const minutes = process.env.ENV === 'DEV' ? 1 : 10;
 const limiter = rateLimiter({ windowMs: minutes * 60 * 1000, max: 100});
 // slow downer
 const slowDowner = slowDown({ windowMs: 1 * 60 * 1000, delayAfter: 10, delayMs: () => 3000});

 // cloudinary config
 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
 });

 app.use(limiter);
 app.use(slowDowner);

 // Connecting to DB
 mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('DB connected!'))
 .catch((err) => console.log('Error while connecting to DB ',err.message))
};
 
export default Configs;
