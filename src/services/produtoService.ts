import { Prisma } from '@prisma/client';
import { ProdutoRepository } from '../repositories/produtoRepository';
import { EstoqueRepository } from '../repositories/estoqueRepository';

const produtoRepo = new ProdutoRepository();
const estoqueRepo = new EstoqueRepository();

type ProdutoCreatePayload = Prisma.ProdutoCreateInput & { estoque_total?: number };

export class ProdutoService {
  async criarProduto(payload: ProdutoCreatePayload) {
    const created = await produtoRepo.criar(payload);

    if ((payload.estoque_total ?? 0) > 0) {
      await estoqueRepo.criar({
        produto: { connect: { id: created.id } },
        tipo: 'entrada',
        quantidade: payload.estoque_total!,
      });
    }

    return created;
  }

  async listarProdutos() {
    return produtoRepo.buscar();
  }

  async buscarProdutoPorId(id: number) {
    const produto = await produtoRepo.buscarPorId(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    return produto;
  }

  async atualizarProduto(id: number, data: Prisma.ProdutoUpdateInput) {
    return produtoRepo.atualizar(id, data);
  }

  async deletarProduto(id: number) {
    return produtoRepo.deletar(id);
  }
}
