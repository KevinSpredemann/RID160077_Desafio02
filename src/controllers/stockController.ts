import { Request, Response } from 'express';
import { StockService } from '../services/stockService';

const service = new StockService();

export class StockController {
  async createMov(req: Request, res: Response) {
    const created = await service.createMovimento(req.body);
    return res.status(201).json(created);
  }

  async listMovByProduct(req: Request, res: Response) {
    const productId = Number(req.params.produtoId);
    const movs = await service.getMovimentacoes(productId);
    return res.json(movs);
  }
}
