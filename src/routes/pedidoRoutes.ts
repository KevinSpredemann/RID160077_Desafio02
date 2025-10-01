import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { PedidoController } from '../controllers/pedidoController';
import { createPedidoSchema } from '../schemas/pedidoSchema';


const router = Router();
const controller = new PedidoController();

router.post(
  '/',
  validateBody(createPedidoSchema),
  controller.criar.bind(controller)
);
router.get('/', controller.listar.bind(controller));
router.get('/:id', controller.buscarPorId.bind(controller));

export default router;
