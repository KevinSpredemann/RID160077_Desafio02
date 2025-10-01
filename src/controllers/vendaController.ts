import { Request, Response } from 'express';
import { SaleService } from '../services/vendaService';

const service = new SaleService();

export class VendaController {
  async criar(req: Request, res: Response) {
    const created = await service.createVenda(req.body);
    return res.status(201).json(created);
  }

  async listar(req: Request, res: Response) {
    const list = await service.listVendas();
    return res.json(list);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const v = await service.getVendaById(id);
    return res.json(v);
  }
}
