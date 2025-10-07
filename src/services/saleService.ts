import prisma from '../prisma';
import { z } from 'zod';
import { SaleRepository } from '../repositories/vendaRepository';
import { StockRepository } from '../repositories/stockRepository';
import { createSaleSchema, saleItemSchema } from '../schemas/saleSchema';

const saleRepo = new SaleRepository();
const stockRepo = new StockRepository();

type CreateSalePayload = z.infer<typeof createSaleSchema>;
type SaleItem = z.infer<typeof saleItemSchema> & { unit_price: number };

export class SaleService {
  async create(payload: CreateSalePayload) {
    if (payload.orderId) {
      return this.createByOrder(payload.orderId);
    }
    if (!payload.clientId || !payload.itens || payload.itens.length === 0) {
      throw new Error(
        'Dados inválidos. Forneça pedidoId OU clienteId e itens.'
      );
    }
    throw new Error(
      'Criação de Venda manual ainda não implementada. Use a rota de Pedido e converta.'
    );
  }
  async createByOrder(orderId: number) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order_items: true, sale: true },
    });

    if (!order) {
      throw new Error(`Pedido ${orderId} não encontrado.`);
    }
    if (order.status !== 'PENDING') {
      throw new Error(
        `Pedido ${orderId} já foi processado (Status: ${order.status}).`
      );
    }
    if (order.sale) {
      throw new Error(
        `Pedido ${orderId} já possui uma Venda associada (Venda ID: ${order.sale.id}).`
      );
    }

    const items = await Promise.all(
      order.order_items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(
            `Produto ${item.productId} do pedido não encontrado.`
          );
        }
        if (product.stock_total < item.item_quantity) {
          throw new Error(
            `Estoque insuficiente para o produto ${product.product_name} (ID: ${item.productId}). Disponível: ${product.stock_total}, Pedido: ${item.item_quantity}`
          );
        }

        return {
          productId: item.productId,
          item_quantity: item.item_quantity,
          item_price: item.item_price,
        };
      })
    );

    return prisma.$transaction(async (tx) => {
      const createdSale = await tx.sale.create({
        data: {
          orderId: order.id,
          clientId: order.clientId,
          total: order.total,
        },
      });

      for (const item of items) {
        await tx.saleItem.create({
          data: {
            saleId: createdSale.id,
            productId: item.productId,
            item_quantity: item.item_quantity,
            item_price: item.item_price,
          },
        });

        await tx.product.update({
          where: { id: item.productId },
          data: { stock_total: { decrement: item.item_quantity } },
        });

        await tx.stock.create({
          data: {
            productId: item.productId,
            move_type: 'saida',
            move_quantity: item.item_quantity,
          },
        });
      }

      await tx.order.update({
        where: { id: order.id },
        data: { status: 'APPROVED' },
      });

      return tx.sale.findUnique({
        where: { id: createdSale.id },
        include: {
          sale_items: { include: { product: true } },
          client: true,
          order: true,
        },
      });
    });
  }

  async findAll() {
    return saleRepo.findAll();
  }

  async findById(id: number) {
    const sale = await saleRepo.findById(id);
    if (!sale) {
      throw new Error('Venda não encontrada');
    }
    return sale;
  }
}
