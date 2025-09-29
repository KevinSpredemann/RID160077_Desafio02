import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

const service = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    const { clienteId, itens } = req.body;
    const created = await service.createPedido(clienteId, itens);
    return res.status(201).json(created);
  }

  async list(req: Request, res: Response) {
    const list = await service.listPedidos();
    return res.json(list);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const p = await service.getPedidoById(id);
    return res.json(p);
  }
}
