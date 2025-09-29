import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { ProductController } from '../controllers/productController';
import { productSchema } from '../schemas/productSchema';

const router = Router();
const controller = new ProductController();

router.post(
  '/',
  validateBody(productSchema),
  controller.create.bind(controller)
);
router.get('/', controller.list.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.put(
  '/:id',
  validateBody(productSchema),
  controller.update.bind(controller)
);
router.delete('/:id', controller.remove.bind(controller));

export default router;
