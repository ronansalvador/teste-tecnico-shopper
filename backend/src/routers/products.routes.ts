import { Router } from 'express';
import ProductsController from '../controllers/ProductsContoller'

const productRouter = Router();
const productsController = new ProductsController();

productRouter.get('/', productsController.findAll);

export default productRouter;