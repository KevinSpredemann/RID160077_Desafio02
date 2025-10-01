import { Request, Response } from 'express';
import { EstoqueService } from '../services/estoqueService';

const service = new EstoqueService();

export class EstoqueController {
  async criarMovimento(req: Request, res: Response) {
    const created = await service.criarMovimento(req.body);
    return res.status(201).json(created);
  }

  async listarMovimentosPorProduto(req: Request, res: Response) { 
    const produtoId = Number(req.params.produtoId);
    const movs = await service.listarMovimentosPorProduto(produtoId);
    return res.json(movs);
  }
}
