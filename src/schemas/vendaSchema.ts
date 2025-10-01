
import { z } from "zod";

export const vendaItemSchema = z.object({
  produtoId: z.number().int().positive(),
  quantidade: z.number().int().positive(),
  unit_price: z.number().positive().optional(), 
});

const createVendaByPedidoSchema = z.object({
  pedidoId: z.number().int().positive(),
  clienteId: z.number().optional(),
  itens: z.array(vendaItemSchema).optional()
});

const createVendaManualSchema = z.object({
  clienteId: z.number().int().positive(),
  itens: z.array(vendaItemSchema).min(1), 
  pedidoId: z.number().optional()
});

export const createVendaSchema = z.union([
  createVendaByPedidoSchema,
  createVendaManualSchema
]);