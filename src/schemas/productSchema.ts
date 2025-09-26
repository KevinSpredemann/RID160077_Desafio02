import z from "zod";

export const productSchema = z.object({
  nome_produto: z.string().min(1),
  descricao: z.string().optional(),
  sku: z.string().optional(),
  preco_unitario: z.number().nonnegative(),
  estoque_total: z.number().int().nonnegative()
});

