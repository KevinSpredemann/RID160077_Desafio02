import { Request, Response } from 'express';
import { ClientService } from '../services/clientService';

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  async create(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    const created = await this.clientService.create(req.body);
    return res.status(201).json(created);
  }

  async findAll(req: Request, res: Response) {
    const clients = await this.clientService.findAll();
    return res.json(clients);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const client = await this.clientService.findById(id);
    return res.json(client);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await this.clientService.update(id, req.body);
    return res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.clientService.delete(id);
    return res.status(204).send();
  }
}
