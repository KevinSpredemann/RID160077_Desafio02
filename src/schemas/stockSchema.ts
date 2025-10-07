import z from "zod";

export const stockMovSchema = z.object({
  productId: z.number().int().positive("ID do produto deve ser um número positivo"),
  move_type: z.enum(['entrada', 'saida'], { message: "Tipo deve ser 'entrada' ou 'saida'" }),
  move_quantity: z.number().int().positive("Quantidade deve ser um número positivo"),
});
