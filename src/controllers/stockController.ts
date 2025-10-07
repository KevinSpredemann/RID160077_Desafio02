import { Request, Response } from 'express';
import { EstoqueService } from '../services/stockService';

export class StockController {

  private stockService: StockService;

  constructor() {
    this.stockService = new StockService();
  }
  async createMov(req: Request, res: Response) {
    const created = await this.stockService.create(req.body);
    return res.status(201).json(created);
  }

  async listMovForProduct(req: Request, res: Response) { 
    const productId = Number(req.params.productId);
    const movs = await this.stockService.listMovForProduct(productId);
    return res.json(movs);
  }
}
