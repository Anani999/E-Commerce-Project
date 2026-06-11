import express from 'express';

import config from './config.js';
import auth, {adminMiddleware as admin} from './middlewares/authMiddleware.js'
import { success, serverError, badRequest } from './utils/apiResponse.js'

import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js'
import orderRoutes from './routes/order.js'
import userRoutes from './routes/user.js'

import devLog from './utils/env.js'


const app = express();
const PORT = process.env.PORT || 5000;

// Configuring things
config(app);

const env = process.env.ENV;

// Defining routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);

app.get('/', auth,  (req, res) => success(res, `Hi ${req.user.username}`))
app.get('/admin', auth, admin,  (req, res) => success(res, `Hi ${req.user.username}`))


// Error Handler 
function ErrorHandler(err, req, res, next){
 console.error('Unhandled error : ', err);
 res.status(500).json({success:false, message:'Internal Server Error'});
}

app.use(ErrorHandler)

app.listen(PORT, () => {
 console.log(`Starting server with ENV : ${env}`)
})
