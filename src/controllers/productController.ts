import { Request, Response } from 'express';
import { ProdutoService } from '../services/productService';

export class ProductController {

  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }
  async create(req: Request, res: Response) {
    const created = await this.productService.create(req.body);
    return res.status(201).json(created);
  }

  async findAll(req: Request, res: Response) {
    const products = await this.productService.findAll();
    return res.json(products);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await this.productService.findById(id);
    return res.json(product);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await this.productService.update(id, req.body);
    return res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.productService.delete(id);
    return res.status(204).send();
  }
}
