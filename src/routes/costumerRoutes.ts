import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { CostumerController } from '../controllers/costumerController';
import { createCostumerSchema } from '../schemas/costumerSchema';

const router = Router();
const controller = new CostumerController();

router.post(
  '/',
  validateBody(createCostumerSchema),
  controller.create.bind(controller)
);
router.get('/', controller.list.bind(controller));

export default router;
