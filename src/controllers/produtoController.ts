import { Request, Response } from 'express';
import { ProdutoService } from '../services/produtoService';

const service = new ProdutoService();

export class ProdutoController {
  async criar(req: Request, res: Response) {
    const created = await service.criarProduto(req.body);
    return res.status(201).json(created);
  }

  async listar(req: Request, res: Response) {
    const list = await service.listarProdutos();
    return res.json(list);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const produto = await service.buscarProdutoPorId(id);
    return res.json(produto);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await service.atualizarProduto(id, req.body);
    return res.json(updated);
  }

  async remover(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.deletarProduto(id);
    return res.status(204).send();
  }
}
