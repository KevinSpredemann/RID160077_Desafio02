import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { ProdutoController } from '../controllers/produtoController';
import { produtoSchema } from '../schemas/produtoSchema';


const router = Router();
const controller = new ProdutoController();

router.post(
  '/',
  validateBody(produtoSchema),
  controller.criar.bind(controller)
);
router.get('/', controller.listar.bind(controller));
router.get('/:id', controller.buscarPorId.bind(controller));
router.put(
  '/:id',
  validateBody(produtoSchema),
  controller.atualizar.bind(controller)
);
router.delete('/:id', controller.remover.bind(controller));

export default router;
