import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type OrderCreateInput = Prisma.OrderCreateInput;
type OrderUpdateInput = Prisma.OrderUpdateInput;

export class OrderRepository extends BaseRepository<
  'order',
  OrderCreateInput,
  OrderUpdateInput
> {
  constructor() {
    super(prisma, 'order');
  }

  async findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        client: true,
        order_items: {
          include: { product: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        client: true,
        order_items: {
          include: { product: true },
        },
      },
    });
  }
}