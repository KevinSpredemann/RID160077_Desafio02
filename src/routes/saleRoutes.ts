import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { SaleController } from '../controllers/saleController';
import { createSaleSchema } from '../schemas/saleSchema';

const router = Router();
const controller = new SaleController();

router.post(
  '/',
  validateBody(createSaleSchema),
  controller.create.bind(controller)
);
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

export default router;
