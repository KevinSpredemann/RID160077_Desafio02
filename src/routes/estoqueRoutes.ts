import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import { EstoqueController } from '../controllers/stockController';
import { estoqueMovSchema } from '../schemas/stockSchema';

const router = Router();
const controller = new EstoqueController();

router.post(
  '/',
  validateBody(estoqueMovSchema),
  controller.criarMovimento.bind(controller)
);
router.get(
  '/:produtoId',
  controller.listarMovimentosPorProduto.bind(controller)
);

export default router;
