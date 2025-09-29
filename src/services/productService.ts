import { Prisma } from "@prisma/client";
import { ProductRepository } from "../repositories/productRepository";
import { StockRepository } from "../repositories/stockRepository";

const productRepo = new ProductRepository();
const stockRepo = new StockRepository();

type ProdutoCreatePayload = Prisma.ProdutoCreateInput & { estoque_total?: number };

export class ProductService {
  async createProduto(payload: ProdutoCreatePayload) {

    const created = await productRepo.create(payload);

    if ((payload.estoque_total ?? 0) > 0) {
      await stockRepo.create({
        produto: { connect: { id: created.id } },
        tipo: "entrada",
        quantidade: payload.estoque_total!,
      });
    }
    
    return created;
  }

  async listProdutos() {
    return productRepo.findAll();
  }

  async getProdutoById(id: number) {
    const produto = await productRepo.findById(id);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }
    return produto;
  }
  
  async updateProduto(id: number, data: Prisma.ProdutoUpdateInput) {
    return productRepo.update(id, data);
  }
  
  async deleteProduto(id: number) {
    return productRepo.delete(id);
  }
}