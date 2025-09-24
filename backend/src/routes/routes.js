import { Router } from 'express';
import * as productController from '../controllers/products.js';

const router = Router();

router.get('/products', productController.GetAllProducts);
router.get('/products/:id', productController.GetIdProducts);
router.post('/products', productController.CreateProduct);
router.put('/products/:id', productController.UpdateProduct);
router.delete('/products/:id', productController.DeleteProduct);

export default router;