import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { StockController } from '../controllers/stockController';
import { stockMovSchema } from '../schemas/stockSchema';

const router = Router();
const controller = new StockController();

router.post(
  '/',
  validateBody(stockMovSchema),
  controller.createMov.bind(controller)
);
router.get(
  '/:productId',
  controller.listMovForProduct.bind(controller)
);

export default router;
