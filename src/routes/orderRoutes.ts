import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { OrderController} from '../controllers/orderController';
import { createOrderSchema } from '../schemas/orderSchema';

const router = Router();
const controller = new OrderController();

router.post(
  '/',
  validateBody(createOrderSchema),
  controller.create.bind(controller)
);
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
