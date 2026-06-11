import express from 'express'
import auth from '../middlewares/authMiddleware.js'
import { 
 getUserAddresses,
 createAddress
} from '../controllers/user.js'

const router = express.Router();
router.use(auth);

router.get('/', (req, res) => {
 return res.status(200).json({ 
  message:'User fetched ',  
  success: true,
  data: {user:req.user} 
 }); 
});
router.get('/address', getUserAddresses);
router.post('/address', createAddress);

export default router;

