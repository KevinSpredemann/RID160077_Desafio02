import z from "zod";

export const estoqueMovSchema = z.object({
  productId: z.number().int().positive("ID do produto deve ser um número positivo"),
  mov_type: z.enum(['entrada', 'saida'], { message: "Tipo deve ser 'entrada' ou 'saida'" }),
  move_quantity: z.number().int().positive("Quantidade deve ser um número positivo"),
});
