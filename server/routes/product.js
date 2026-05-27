import express from 'express'
import { createProduct, getProductById, getProducts, deleteProduct, updateProduct, searchProducts } from '../controllers/product.js'
import multer from 'multer'

import auth, {adminMiddleware as admin} from '../middlewares/authMiddleware.js'

const router = express.Router();
const upload = multer({ dest: 'product_images/'});

router.post('/', auth, admin, upload.single('image'), createProduct);
router.get('/search', auth, searchProducts)
router.get('/:id', auth, getProductById);
router.get('/', auth, getProducts);
router.delete('/:id', auth, admin,  deleteProduct);
router.put('/:id', auth, admin, updateProduct)

export default router;

