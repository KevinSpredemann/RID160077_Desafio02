import prisma from '../prisma';

import { z } from 'zod';
import { OrderRepository } from '../repositories/orderRepository';
import { orderItemSchema } from '../schemas/orderSchema';

const orderRepo = new OrderRepository();
type OrderItem = z.infer<typeof orderItemSchema>; // 'z.infer' extrai o tipo TypeScript do esquema Zod.

export class PedidoService {
  async createPedido(clienteId: number, itens: OrderItem[]) {
    if (itens.length === 0) throw new Error('Pedido deve ter ao menos 1 item');

    const pedido = await prisma.$transaction(async (tx) => {
      const itensComPreco = await Promise.all(
        itens.map(async (it) => {
          const product = await tx.produto.findUnique({
            where: { id: it.produtoId },
          });
          if (!product)
            throw new Error(`Produto ${it.produtoId} não encontrado`);

          return {
            produto: { connect: { id: it.produtoId } },
            quantidade: it.quantidade,
            unit_price: product.preco_unitario,
          };
        })
      );

      const created = await tx.pedido.create({
        data: {
          cliente: { connect: { id: clienteId } },
        },
        include: { itens_pedido: true },
      });

      const total = created.itens_pedido.reduce(
        (acc, it) => acc + it.unit_price * it.quantidade,
        0
      );
      await tx.pedido.update({ where: { id: created.id }, data: { total } });

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
    return orderRepo.findAll();
  }

  async getPedidoById(id: number) {
    const pedido = await orderRepo.findById(id);
    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }
    return pedido;
  }
}
