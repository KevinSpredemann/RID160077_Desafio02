import z from "zod";

export const saleItemSchema = z.object({
  produtoId: z.number().int().positive(),
  quantidade: z.number().int().positive()
});

type SaleItemSchema = typeof saleItemSchema;

export const createSaleSchema = z.object({
  clienteId: z.number().int().positive().optional(),
  pedidoId: z.number().int().positive().optional(),
  itens: z.array(saleItemSchema).min(1)
});