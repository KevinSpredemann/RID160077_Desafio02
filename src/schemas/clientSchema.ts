import z from "zod";

export const createClientSchema = z.object({
  client_name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
});
