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
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));
router.put(
  '/:id',
  validateBody(productSchema),
  controller.update.bind(controller)
);
router.delete('/:id', controller.delete.bind(controller));

export default router;
