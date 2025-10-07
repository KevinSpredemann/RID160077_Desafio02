import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { ClienteController } from '../controllers/clientController';
import { createClienteSchema } from '../schemas/clientSchema';

const router = Router();
const controller = new ClienteController();

router.post(
  '/',
  validateBody(createClienteSchema),
  controller.criar.bind(controller)
);
router.get('/', controller.listar.bind(controller));

export default router;
