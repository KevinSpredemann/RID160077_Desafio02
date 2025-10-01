import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type PedidoCreateInput = Prisma.PedidoCreateInput;
type PedidoUpdateInput = Prisma.PedidoUpdateInput;

export class PedidoRepository extends BaseRepository<
  'pedido',
  PedidoCreateInput,
  PedidoUpdateInput
> {
  constructor() {
    super(prisma, 'pedido');
  }

  async buscarPorId(id: number) {
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

  async listar() {
    return this.prisma.pedido.findMany({
      include: {
        cliente: true,
        itens_pedido: {
          include: { produto: true },
        },
      },
    });
  }
}