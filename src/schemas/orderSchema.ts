import z, { TypeOf } from "zod";

export const orderItemSchema = z.object({
    produtoId: z.number().int().positive("ID do produto deve ser um número positivo"),
    quantidade: z.number().int().positive("Quantidade deve ser um número positivo"),
});

export type OrderItemSchema = typeof orderItemSchema;

export const createOrderSchema = z.object({
   clienteId : z.number().int().positive("ID do cliente deve ser um número positivo"),
    itens_pedido : z.array(orderItemSchema).min(1, "O pedido deve conter ao menos um item"),
});