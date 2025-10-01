import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { EstoqueController } from '../controllers/estoqueController';
import { estoqueMovSchema } from '../schemas/estoqueSchema';

const router = Router();
const controller = new EstoqueController();

router.post(
  '/',
  validateBody(estoqueMovSchema),
  controller.criarMovimento.bind(controller)
);
router.get(
  '/produto/:produtoId',
  controller.listarMovimentosPorProduto.bind(controller)
);

export default router;
