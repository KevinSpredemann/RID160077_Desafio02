import { Prisma, PrismaClient } from "@prisma/client";

type NomeModelo = keyof PrismaClient;

export class BaseRepository<T extends NomeModelo, CreateInput, UpdateInput> {
    protected prisma: any;
    protected modelName: T;

    constructor(prismaClient: PrismaClient, modelName: T) {
        this.prisma = prismaClient;
        this.modelName = modelName;
    }

    async criar(data: CreateInput) {
        return this.prisma[this.modelName].create({ data });
    }

    async buscarPorId(id: number, include?: any) {
        return this.prisma[this.modelName].findUnique({ where: { id }, include });
    }

    async buscar(include?: any) {
        return this.prisma[this.modelName].findMany({ include });
    }

    async atualizar(id: number, data: UpdateInput) {
        return this.prisma[this.modelName].update({ where: { id }, data });
    }

    async deletar(id: number) {
        return this.prisma[this.modelName].delete({ where: { id } });
    }
}
