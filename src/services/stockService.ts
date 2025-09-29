import prisma from "../prisma";

import { z } from "zod";
import { StockRepository } from "../repositories/stockRepository";
import { ProductRepository } from "../repositories/productRepository";
import { stockMovSchema } from "../schemas/stockSchema";

const stockRepo = new StockRepository();
const productRepo = new ProductRepository();

type StockMovPayload = z.infer<typeof stockMovSchema>;

export class StockService {
  async createMovimento(payload: StockMovPayload) {
    if (payload.quantidade <= 0) throw new Error("Quantidade deve ser positiva");

    return prisma.$transaction(async (tx) => {
      if (payload.tipo === "entrada") {
        await tx.produto.update({ where: { id: payload.produtoId }, data: { estoque_total: { increment: payload.quantidade } } });
      } else {
        const product = await tx.produto.findUnique({ where: { id: payload.produtoId } });
        if (!product) throw new Error("Produto não encontrado");
        if (product.estoque_total < payload.quantidade) throw new Error("Estoque insuficiente");
        
        await tx.produto.update({ where: { id: payload.produtoId }, data: { estoque_total: { decrement: payload.quantidade } } });
      }

      return tx.estoque.create({
        data: {
          produto: { connect: { id: payload.produtoId } },
          tipo: payload.tipo,
          quantidade: payload.quantidade
        }
      });
    });
  }

  async getMovimentacoes(produtoId: number) {
    return stockRepo.findByProductId(produtoId);
  }
}