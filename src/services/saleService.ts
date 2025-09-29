// src/services/vendaService.ts

import prisma from "../prisma";
;
import { z } from "zod";
import { SaleRepository } from "../repositories/saleRepository";
import { StockRepository } from "../repositories/stockRepository";
import { createSaleSchema } from "../schemas/saleSchema";

const saleRepo = new SaleRepository();
const stockRepo = new StockRepository();

type SalePayload = z.infer<typeof createSaleSchema>;

export class SaleService {
  async createVenda(payload: SalePayload) {
    if (!payload.itens || payload.itens.length === 0) throw new Error("Venda precisa ter ao menos 1 item");
    
    for (const it of payload.itens) {
      const prod = await prisma.produto.findUnique({ where: { id: it.produtoId } });
      if (!prod) throw new Error(`Produto ${it.produtoId} não encontrado`);
      if (prod.estoque_total < it.quantidade) throw new Error(`Estoque insuficiente para ${prod.nome_produto}. Disponível: ${prod.estoque_total}`);
    }

    const sale = await prisma.$transaction(async (tx) => {
      const saleCreateData: any = {
        total: 0,
        data_venda: new Date(),
      };
      if (payload.pedidoId) saleCreateData.pedido = { connect: { id: payload.pedidoId } };
      if (payload.clienteId) saleCreateData.cliente = { connect: { id: payload.clienteId } };
      
      const createdSale = await tx.venda.create({ data: saleCreateData });
      let total = 0;
      
      for (const it of payload.itens) {
        const prod = await tx.produto.findUnique({ where: { id: it.produtoId } });
        if (!prod) throw new Error("Produto não encontrado");
        
        const unitPrice = prod.preco_unitario;
        total += unitPrice * it.quantidade;
        
        await tx.itemVenda.create({
          data: {
            vendaId: createdSale.id,
            produtoId: it.produtoId,
            quantidade: it.quantidade,
            unit_price: unitPrice
          }
        })
        
        await tx.produto.update({
          where: { id: it.produtoId },
          data: { estoque_total: { decrement: it.quantidade } }
        });
        
        await tx.estoque.create({
          data: {
            produto: { connect: { id: it.produtoId } },
            tipo: "saida",
            quantidade: it.quantidade
          }
        });
      }
    
      await tx.venda.update({ where: { id: createdSale.id }, data: { total } });
      
      return tx.venda.findUnique({ where: { id: createdSale.id }, include: { itens_venda: { include: { produto: true } }, cliente: true, pedido: true } });
    });
    
    return sale;
  }

  async listVendas() {
    return saleRepo.findAll();
  }

  async getVendaById(id: number) {
    const s = await saleRepo.findById(id);
    if (!s) throw new Error("Venda não encontrada");
    return s;
  }
}