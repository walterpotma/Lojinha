import { Router } from 'express';
import * as productController from '../controllers/products.js';
import * as accountController from '../controllers/account.js';

const router = Router();

router.get('/products', productController.GetAllProducts);
router.get('/products/:id', productController.GetIdProducts);
router.post('/products', productController.CreateProduct);
router.put('/products/:id', productController.UpdateProduct);
router.delete('/products/:id', productController.DeleteProduct);

router.get('/user', accountController.GetAllUser);
router.get('/user/:id', accountController.GetIdUser);
router.post('/user', accountController.CreateUser);
router.put('/user/:id', accountController.UpdateUser);
router.delete('/user/:id', accountController.DeleteUser);
router.post('/user/login', accountController.Login);

export default router;