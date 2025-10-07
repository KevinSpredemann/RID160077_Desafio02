import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type ProductCreateInput = Prisma.ProductCreateInput;
type ProductUpdateInput = Prisma.ProductUpdateInput;

export class ProductRepository extends BaseRepository<
  'product',
  ProductCreateInput,
  ProductUpdateInput
> {
  constructor() {
    super(prisma, 'product');
  }
}
