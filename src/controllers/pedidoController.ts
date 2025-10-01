import { Request, Response } from 'express';
import { PedidoService } from '../services/pedidoService';


const service = new PedidoService();

export class PedidoController {
  async criar(req: Request, res: Response) {
    const created = await service.createPedido(req.body);
    return res.status(201).json(created);
  }

  async listar(req: Request, res: Response) {
    const list = await service.listPedidos();
    return res.json(list);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const p = await service.getPedidoById(id);
    return res.json(p);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.delete(id);
    return res.status(204).send();
  }
}
