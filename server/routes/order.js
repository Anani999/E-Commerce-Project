import express from 'express'
import auth, {adminMiddleware as admin} from '../middlewares/authMiddleware.js'

import { createOrder, getOrders, getOrder, updateOrderStatus, verifyPayment, adminGetOrders } from '../controllers/order.js'

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/all', auth, admin, adminGetOrders);
router.get('/:id', auth, getOrder);
router.put('/:id', auth, admin, updateOrderStatus)
router.post('/verify-payment', auth, verifyPayment);


export default router;
