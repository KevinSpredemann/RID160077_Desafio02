import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

const service = new ProductService();

export class ProductController {
  async create(req: Request, res: Response) {
    const created = await service.createProduto(req.body);
    return res.status(201).json(created);
  }

  async list(req: Request, res: Response) {
    const list = await service.listProdutos();
    return res.json(list);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const produto = await service.getProdutoById(id);
    return res.json(produto);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await service.updateProduto(id, req.body);
    return res.json(updated);
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.deleteProduto(id);
    return res.status(204).send();
  }
}
