import prisma from '../prisma';
import { z } from 'zod';
import { vendaItemSchema, createVendaSchema } from '../schemas/vendaSchema';
import { VendaRepository } from '../repositories/vendaRepository';
import { EstoqueRepository } from '../repositories/estoqueRepository';


const vendaRepo = new VendaRepository();
const estoqueService = new EstoqueRepository();

type CreateVendaPayload = z.infer<typeof createVendaSchema>;
type VendaItem = z.infer<typeof vendaItemSchema> & { unit_price: number };

export class SaleService {
  async createVenda(payload: CreateVendaPayload) {
    if (payload.pedidoId) {
      return this.processarVendaPorPedido(payload.pedidoId);
    }
    if (!payload.clienteId || !payload.itens || payload.itens.length === 0) {
      throw new Error(
        'Dados inválidos. Forneça pedidoId OU clienteId e itens.'
      );
    }
    throw new Error(
      'Criação de Venda manual ainda não implementada. Use a rota de Pedido e converta.'
    );
  }
  async processarVendaPorPedido(pedidoId: number) {
    const pedido = await prisma.pedido.findUnique({
      where: { id: pedidoId },
      include: { itens_pedido: true, venda: true },
    });

    if (!pedido) {
      throw new Error(`Pedido ${pedidoId} não encontrado.`);
    }
    if (pedido.status !== 'PENDENTE') {
      throw new Error(
        `Pedido ${pedidoId} já foi processado (Status: ${pedido.status}).`
      );
    }
    if (pedido.venda) {
      throw new Error(
        `Pedido ${pedidoId} já possui uma Venda associada (Venda ID: ${pedido.venda.id}).`
      );
    }

    const itensVenda = await Promise.all(
      pedido.itens_pedido.map(async (item) => {
        const produto = await prisma.produto.findUnique({
          where: { id: item.produtoId },
        });

        if (!produto) {
          throw new Error(
            `Produto ${item.produtoId} do pedido não encontrado.`
          );
        }
        if (produto.estoque_total < item.quantidade) {
          throw new Error(
            `Estoque insuficiente para o produto ${produto.nome_produto} (ID: ${item.produtoId}). Disponível: ${produto.estoque_total}, Pedido: ${item.quantidade}`
          );
        }

        return {
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          unit_price: item.unit_price,
        };
      })
    );

    return prisma.$transaction(async (tx) => {
      const createdVenda = await tx.venda.create({
        data: {
          pedidoId: pedido.id,
          clienteId: pedido.clienteId,
          total: pedido.total,
        },
      });

      for (const item of itensVenda) {
        await tx.itemVenda.create({
          data: {
            vendaId: createdVenda.id,
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            unit_price: item.unit_price,
          },
        });

        await tx.produto.update({
          where: { id: item.produtoId },
          data: { estoque_total: { decrement: item.quantidade } },
        });

        await tx.estoque.create({
          data: {
            produtoId: item.produtoId,
            tipo: 'saida',
            quantidade: item.quantidade,
          },
        });
      }

      await tx.pedido.update({
        where: { id: pedidoId },
        data: { status: 'APROVADO' },
      });

      return tx.venda.findUnique({
        where: { id: createdVenda.id },
        include: {
          itens_venda: { include: { produto: true } },
          cliente: true,
          pedido: true,
        },
      });
    });
  }

  async listVendas() {
    return vendaRepo.buscar();
  }

  async getVendaById(id: number) {
    const venda = await vendaRepo.buscarPorId(id);
    if (!venda) {
      throw new Error('Venda não encontrada');
    }
    return venda;
  }
}
