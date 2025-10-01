import prisma from '../prisma';
import { z } from 'zod';
import { PedidoRepository } from '../repositories/pedidoRepository';
import { pedidoItemSchema } from '../schemas/pedidoSchema';

const pedidoRepo = new PedidoRepository();
type PedidoItem = z.infer<typeof pedidoItemSchema>;

export class PedidoService {
  async createPedido(payload: { clienteId: number; itens: PedidoItem[] }) {
    const { clienteId, itens } = payload;

    if (itens.length === 0) throw new Error('Pedido deve ter ao menos 1 item');

    const client = await prisma.cliente.findUnique({
      where: { id: clienteId },
    });

    if (!client) {
      throw new Error(`Cliente ${clienteId} não encontrado.`);
    }

    const itensComPreco = await Promise.all(
      itens.map(async (it) => {
        const product = await prisma.produto.findUnique({
          where: { id: it.produtoId },
          select: { id: true, nome_produto: true, preco_unitario: true },
        });

        if (!product) {
          throw new Error(`Produto ${it.produtoId} não encontrado`);
        }

        return {
          produtoId: it.produtoId,
          quantidade: it.quantidade,
          unit_price: product.preco_unitario,
        };
      })
    );

    const pedido = await prisma.$transaction(async (tx) => {
      const created = await tx.pedido.create({
        data: {
          cliente: { connect: { id: clienteId } },
          status: 'PENDENTE',
        },
      });

      let totalCalculado = 0;
      for (const item of itensComPreco) {
        await tx.itemPedido.create({
          data: {
            pedidoId: created.id,
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            unit_price: item.unit_price,
          },
        });
        totalCalculado += item.unit_price * item.quantidade;
      }
      await tx.pedido.update({
        where: { id: created.id },
        data: { total: totalCalculado },
      });

      return tx.pedido.findUnique({
        where: { id: created.id },
        include: {
          itens_pedido: { include: { produto: true } },
          cliente: true,
        },
      });
    });

    return pedido;
  }

  async listPedidos() {
    return pedidoRepo.buscar();
  }

  async getPedidoById(id: number) {
    const pedido = await pedidoRepo.buscarPorId(id);
    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }
    return pedido;
  }
}
