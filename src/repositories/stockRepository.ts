import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type StockCreateInput = Prisma.EstoqueCreateInput;
type StockUpdateInput = Prisma.EstoqueUpdateInput;

export class StockRepository extends BaseRepository<
  'estoque',
  StockCreateInput,
  StockUpdateInput
> {
  constructor() {
    super(prisma, 'estoque');
  }

  async findByProductId(productId: number) {
    return this.prisma.estoque.findUnique({
      where: { produtoId: productId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
