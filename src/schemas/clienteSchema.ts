import z from "zod";

export const createClienteSchema = z.object({
  nome_cliente: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
});
