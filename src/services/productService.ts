import { Prisma } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';
import { StockRepository } from '../repositories/stockRepository';

const productRepo = new ProductRepository();
const stockRepo = new StockRepository();

type ProductCreatePayload = Prisma.ProductCreateInput & {
  estoque_total?: number;
};

export class ProductService {
  async create(payload: ProductCreatePayload) {
    const created = await productRepo.create(payload);

    if ((payload.stock_total ?? 0) > 0) {
      await stockRepo.create({
        product: { connect: { id: created.id } },
        move_type: 'entrada',
        move_quantity: payload.stock_total!,
      });
    }

    return created;
  }

  async findAll() {
    return productRepo.findAll();
  }

  async findById(id: number) {
    const product = await productRepo.findById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    return productRepo.updated(id, data);
  }

  async delete(id: number) {
    return productRepo.delete(id);
  }
}
