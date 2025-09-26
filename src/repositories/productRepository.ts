import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { BaseRepository } from "./baseRepository";

type ProductCreateInput = Prisma.ProdutoCreateInput;
type ProductUpdateInput = Prisma.ProdutoUpdateInput;

export class ProductRepository extends BaseRepository<"produto", ProductCreateInput, ProductUpdateInput> {
    constructor() {
        super(prisma, "produto");
    }    
}