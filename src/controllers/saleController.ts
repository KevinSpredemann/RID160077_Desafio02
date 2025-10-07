import { Request, Response } from 'express';
import { SaleService } from '../services/saleService';

export class SaleController {

  private saleService: SaleService;

  constructor() {
    this.saleService = new SaleService();
  }
  async create(req: Request, res: Response) {
    const created = await this.saleService.create(req.body);
    return res.status(201).json(created);
  }

  async findAll(req: Request, res: Response) {
    const sales = await this.saleService.findAll();
    return res.json(sales);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const sale = await this.saleService.findById(id);
    return res.json(sale);
  }
}
