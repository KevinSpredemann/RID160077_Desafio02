import z from 'zod';

export const orderItemSchema = z.object({
  productId: z
    .number()
    .int()
    .positive('ID do produto deve ser um número positivo'),
  item_quantity: z
    .number()
    .int()
    .positive('Quantidade deve ser um número positivo'),
});

export type OrderItemSchema = typeof orderItemSchema;

export const createOrderSchema = z.object({
  clientId: z
    .number()
    .int()
    .positive('ID do cliente deve ser um número positivo'),
  itens: z
    .array(orderItemSchema)
    .min(1, 'O pedido deve conter ao menos um item'),
});
