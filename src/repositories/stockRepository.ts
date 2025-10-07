import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type StockCreateInput = Prisma.StockCreateInput;
type StockUpdateInput = Prisma.StockUpdateInput;

export class StockRepository extends BaseRepository<
  'stock',
  StockCreateInput,
  StockUpdateInput
> {
  constructor() {
    super(prisma, 'stock');
  }
  async findByProduct(productId: number) {
    return this.prisma.stock.findMany({
      where: { productId },
      orderBy: { created_at: 'desc' },
    });
  }
}
