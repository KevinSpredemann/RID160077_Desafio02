import z, { TypeOf } from 'zod';

export const pedidoItemSchema = z.object({
  produtoId: z
    .number()
    .int()
    .positive('ID do produto deve ser um número positivo'),
  quantidade: z
    .number()
    .int()
    .positive('Quantidade deve ser um número positivo'),
});

export type OrderItemSchema = typeof pedidoItemSchema;

export const createPedidoSchema = z.object({
  clienteId: z
    .number()
    .int()
    .positive('ID do cliente deve ser um número positivo'),
  itens: z
    .array(pedidoItemSchema)
    .min(1, 'O pedido deve conter ao menos um item'),
});
