import prisma from '../prisma';
import { z } from 'zod';
import { OrderRepository } from '../repositories/orderRepository';
import { orderItemSchema } from '../schemas/orderSchema';

const orderRepo = new OrderRepository();
type OrderItem = z.infer<typeof orderItemSchema>;

export class OrderService {
  async create(payload: { clientId: number; itens: OrderItem[] }) {
    const { clientId, itens } = payload;

    if (itens.length === 0) throw new Error('Pedido deve ter ao menos 1 item');

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      throw new Error(`Cliente ${clientId} não encontrado.`);
    }

    const itemsWithPrice = await Promise.all(
      itens.map(async (it) => {
        const product = await prisma.product.findUnique({
          where: { id: it.productId },
          select: { id: true, product_name: true, product_price: true },
        });

        if (!product) {
          throw new Error(`Produto ${it.productId} não encontrado`);
        }

        return {
          productId: it.productId,
          item_quantity: it.item_quantity,
          product_price: product.product_price,
        };
      })
    );

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          client: { connect: { id: clientId } },
          status: 'PENDING',
        },
      });

      let totalCalculated = 0;
      for (const item of itemsWithPrice) {
        await tx.orderItem.create({
          data: {
            orderId: created.id,
            productId: item.productId,
            item_quantity: item.item_quantity,
            item_price: item.product_price,
          },
        });
        totalCalculated += item.product_price * item.item_quantity;
      }
      await tx.order.update({
        where: { id: created.id },
        data: { total: totalCalculated },
      });

      return tx.order.findUnique({
        where: { id: created.id },
        include: {
          order_items: { include: { product: true } },
          client: true,
        },
      });
    });

    return order;
  }

  async findAll() {
    return orderRepo.findAll();
  }

  async findById(id: number) {
    const order = await orderRepo.findById(id);
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    return order;
  }

  async delete(id: number) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { sale: { include: { sale_items: true } } },
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    if (order.status.toUpperCase() === 'APPROVED') {
      throw new Error(
        'Pedido já APROVADO (Venda finalizada). Não pode ser deletado, apenas CANCELADO/DEVOLVIDO.'
      );
    }

    return prisma.$transaction(async (tx) => {
      if (order.sale) {
        await tx.saleItem.deleteMany({
          where: { saleId: order.sale.id },
        });
        await tx.sale.delete({
          where: { id: order.sale.id },
        });
      }
      await tx.saleItem.deleteMany({
        where: { saleId: id },
      });

      const deletedPedido = await tx.order.delete({
        where: { id },
      });

      return deletedPedido;
    });
  }
}
