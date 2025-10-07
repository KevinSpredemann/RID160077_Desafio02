import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { ClientController } from '../controllers/clientController';
import { createClientSchema } from '../schemas/clientSchema';

const router = Router();
const controller = new ClientController();

router.post(
  '/',
  validateBody(createClientSchema),
  controller.create.bind(controller)
);
router.get('/', controller.findAll.bind(controller));

export default router;
