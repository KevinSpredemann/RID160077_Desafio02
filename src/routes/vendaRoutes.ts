import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { VendaController } from '../controllers/saleController';
import { createVendaSchema } from '../schemas/vendaSchema';

const router = Router();
const controller = new VendaController();

router.post(
  '/',
  validateBody(createVendaSchema),
  controller.criar.bind(controller)
);
router.get('/', controller.listar.bind(controller));
router.get('/:id', controller.buscarPorId.bind(controller));

export default router;
