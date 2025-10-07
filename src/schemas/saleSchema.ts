
import { z } from "zod";

export const saleItemSchema = z.object({
  productId: z.number().int().positive(),
  item_quantity: z.number().int().positive(),
  item_price : z.number().positive().optional(), 
});

const createSaleByOrderSchema = z.object({
  orderId: z.number().int().positive(),
  clientId: z.number().optional(),
  itens: z.array(saleItemSchema).optional()
});

const createManualSaleSchema = z.object({
  clientId: z.number().int().positive(),
  itens: z.array(saleItemSchema).min(1), 
  orderId: z.number().optional()
});

export const createSaleSchema = z.union([
  createSaleByOrderSchema,
  createManualSaleSchema
]);