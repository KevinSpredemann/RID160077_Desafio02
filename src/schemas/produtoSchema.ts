import z from 'zod';

export const productSchema = z.object({
  product_name: z.string().min(1),
  description: z.string().optional(),
  sku: z.string().optional(),
  product_price: z.number().nonnegative(),
  stock_total : z.number().int().nonnegative(),
});
