import { Request, Response } from 'express';
import { ClienteService } from '../services/clienteService';

const service = new ClienteService();

export class ClienteController {
  async criar(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }
    const created = await service.criarCliente(req.body);

    return res.status(201).json(created);
  }

  async listar(req: Request, res: Response) {
    const list = await service.listarClientes();
    return res.json(list);
  }
  
  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cliente = await service.buscarClientePorId(id);
    return res.json(cliente);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await service.atualizarCliente(id, req.body);
    return res.json(updated);
  }

  async remover(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.removerCliente(id);
    return res.status(204).send();
  }
}
