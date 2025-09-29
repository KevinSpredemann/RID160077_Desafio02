import { Request, Response } from 'express';
import { CostumerService } from '../services/costumerService';

const service = new CostumerService();

export class CostumerController {
  async create(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }
    const created = await service.createClient(req.body);

    return res.status(201).json(created);
  }

  async list(req: Request, res: Response) {
    const list = await service.listClients();
    return res.json(list);
  }
}
