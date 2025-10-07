import { Router } from 'express';
import productRoutes from './productRoutes';
import clientRoutes from './clientRoutes';
import orderRoutes from './orderRoutes';
import saleRoutes from './saleRoutes';
import stockRoutes from './stockRoutes';

const router = Router();

router.use('/products', productRoutes);
router.use('/clients', clientRoutes);
router.use('/orders', orderRoutes);
router.use('/sales', saleRoutes);
router.use('/stock', stockRoutes);

export default router;
