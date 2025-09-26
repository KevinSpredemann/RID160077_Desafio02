import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type OrderCreateInput = Prisma.PedidoCreateInput;
type OrderUpdateInput = Prisma.PedidoUpdateInput;

export class OrderRepository extends BaseRepository<
  'pedido',
  OrderCreateInput,
  OrderUpdateInput
> {
  constructor() {
    super(prisma, 'pedido');
  }

  async findById(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
        itens_pedido: {
          include: { produto: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.pedido.findMany({
      include: {
        cliente: true,
        itens_pedido: {
          include: { produto: true },
        },
      },
    });
  }

  async createWithItems(data: OrderCreateInput) {
    return this.prisma.pedido.create({
      data,
      include: {
        items_pedido: true,
      },
    });
  }
}
