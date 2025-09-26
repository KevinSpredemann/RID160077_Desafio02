import z from "zod";

export const createCostumerSchema = z.object({
    nome_cliente: z.string().min(1, "Nome é obrigatório"),
    email: z.email("Email inválido"),
    telefone: z.string().min(10, "Telefone inválido"),
});