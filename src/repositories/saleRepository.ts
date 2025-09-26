import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { BaseRepository } from "./baseRepository";

type SaleCreateInput = Prisma.VendaCreateInput;
type SaleUpdateInput = Prisma.VendaUpdateInput;

export class SaleRepository extends BaseRepository<"venda", SaleCreateInput, SaleUpdateInput> {
    constructor() {
        super(prisma, "venda");
    }

    async findById(id: number) {        
        return this.prisma.venda.findUnique({ where: { id },
            include: {
                cliente: true,
                pedido: true,
                itens_venda: {
                    include: { produto: true },
                },
            }, 
        });
    }

    async findAll() {
        return this.prisma.venda.findMany({ 
            include: {
                cliente: true,
                pedido: true,
                itens_venda: {
                    include: { produto: true },
                },
            }, 
        });
    }
}