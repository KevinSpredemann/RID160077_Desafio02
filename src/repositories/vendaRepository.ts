import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type VendaCreateInput = Prisma.VendaCreateInput;
type VendaUpdateInput = Prisma.VendaUpdateInput;

export class VendaRepository extends BaseRepository<
  'venda',
  VendaCreateInput,
  VendaUpdateInput
> {
  constructor() {
    super(prisma, 'venda');
  }

  async buscarPorId(id: number) {
    return this.prisma.venda.findUnique({
      where: { id },
      include: {
        cliente: true,
        pedido: true,
        itens_venda: {
          include: { produto: true },
        },
      },
    });
  }

  async listar() {
    return this.prisma.venda.findMany({
      include: {
        cliente: true,
        pedido: true,
        itens_venda: {
          include: { produto: true },
        },
      },
    });
  }
}
