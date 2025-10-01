import { Router } from 'express';
import pedidoRoutes from './pedidoRoutes';
import clienteRoutes from './clienteRoutes';
import vendaRoutes from './vendaRoutes';
import estoqueRoutes from './estoqueRoutes';
import produtoRoutes from './produtoRoutes';

const router = Router();

router.use('/produtos', produtoRoutes);
router.use('/clientes', clienteRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/vendas', vendaRoutes);
router.use('/estoque', estoqueRoutes);

export default router;
