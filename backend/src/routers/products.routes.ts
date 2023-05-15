import { Request, Router } from 'express';
import ProductsController from '../controllers/ProductsContoller'
import ValidateFile from '../middlewares/ValidateFile';
import * as multer from 'multer';

const multerconfig = multer();

const productRouter = Router();
const productsController = new ProductsController();

productRouter.get('/', productsController.findAll);
productRouter.post('/', multerconfig.single("file"), productsController.addFile );

export default productRouter;