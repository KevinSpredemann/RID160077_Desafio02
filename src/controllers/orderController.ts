import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {

  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }
  async create(req: Request, res: Response) {
    const created = await this.orderService.create(req.body);
    return res.status(201).json(created);
  }

  async findAll(req: Request, res: Response) {
    const orders = await this.orderService.findAll();
    return res.json(orders);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const order = await this.orderService.findById(id);
    return res.json(order);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.orderService.delete(id);
    return res.status(204).send();
  }
}
