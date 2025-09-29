import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { stockMovSchema } from '../schemas/stockSchema';
import { StockController } from '../controllers/stockController';

const router = Router();
const controller = new StockController();

router.post(
  '/',
  validateBody(stockMovSchema),
  controller.createMov.bind(controller)
);
router.get('/produto/:produtoId', controller.listMovByProduct.bind(controller));

export default router;
