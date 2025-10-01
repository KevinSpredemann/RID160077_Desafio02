import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type EstoqueCreateInput = Prisma.EstoqueCreateInput;
type EstoqueUpdateInput = Prisma.EstoqueUpdateInput;

export class EstoqueRepository extends BaseRepository<
  'estoque',
  EstoqueCreateInput,
  EstoqueUpdateInput
> {
  constructor() {
    super(prisma, 'estoque');
  }
  async listarPorProdutoId(produtoId: number) {
    return this.prisma.estoque.findMany({
      where: { produtoId },
      orderBy: { created_at: 'desc' },
    });
  }
}
