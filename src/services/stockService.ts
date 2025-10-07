import prisma from '../prisma';
import { z } from 'zod';
import { stockMovSchema } from '../schemas/stockSchema';
import { StockRepository } from '../repositories/stockRepository';

const stockRepo = new StockRepository();

type stockMovPayload = z.infer<typeof stockMovSchema>;

export class StockService {
  async create(payload: stockMovPayload) {
    if (payload.move_quantity <= 0)
      throw new Error('Quantidade deve ser positiva');

    return prisma.$transaction(async (tx) => {
      if (payload.mov_type === 'entrada') {
        await tx.product.update({
          where: { id: payload.productId },
          data: { stock_total: { increment: payload.move_quantity } },
        });
      } else {
        const product = await tx.product.findUnique({
          where: { id: payload.productId },
        });
        if (!product) throw new Error('Produto não encontrado');
        if (product.stock_total < payload.move_quantity)
          throw new Error('Estoque insuficiente');

        await tx.product.update({
          where: { id: payload.productId },
          data: { stock_total: { decrement: payload.move_quantity } },
        });
      }

      return tx.stock.create({
        data: {
          product: { connect: { id: payload.productId } },
          move_type: payload.mov_type,
          move_quantity: payload.move_quantity,
        },
      });
    });
  }

  async findProductById(productId: number) {
    return stockRepo.findById(productId);
  }
}
