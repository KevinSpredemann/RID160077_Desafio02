import z from "zod";

export const estoqueMovSchema = z.object({
  produtoId: z.number().int().positive("ID do produto deve ser um número positivo"),
  tipo: z.enum(['entrada', 'saida'], { message: "Tipo deve ser 'entrada' ou 'saida'" }),
  quantidade: z.number().int().positive("Quantidade deve ser um número positivo"),
});
