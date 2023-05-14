import { Router } from 'express';
import productRouter from './products.routes';
// import userRouter from './users.route';
// import orderRoute from './orders.route';
// import loginRoute from './login.route';

const router = Router();

router.use('/products', productRouter);
// router.use('/users', userRouter);
// router.use('/orders', orderRoute);
// router.use('/login', loginRoute);


export default router;