import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type ProdutoCreateInput = Prisma.ProdutoCreateInput;
type ProdutoUpdateInput = Prisma.ProdutoUpdateInput;

export class ProdutoRepository extends BaseRepository<
  'produto',
  ProdutoCreateInput,
  ProdutoUpdateInput
> {
  constructor() {
    super(prisma, 'produto');
  }
}
