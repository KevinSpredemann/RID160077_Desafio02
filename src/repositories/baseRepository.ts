import { Prisma, PrismaClient } from "@prisma/client";

type ModelName = keyof PrismaClient;

export class BaseRepository<T extends ModelName, CreateInput, UpdateInput> {
    protected prisma: any;
    protected modelName: T;

    constructor(prismaClient: PrismaClient, modelName: T) {
        this.prisma = prismaClient;
        this.modelName = modelName;
    }

    async create(data: CreateInput) {
        return this.prisma[this.modelName].create({ data });
    }

    async findById(id: number, include?: any) {
        return this.prisma[this.modelName].findUnique({ where: { id }, include });
    }

    async findAll(include?: any) {
        return this.prisma[this.modelName].findMany({ include });
    }

    async update(id: number, data: UpdateInput) {
        return this.prisma[this.modelName].update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prisma[this.modelName].delete({ where: { id } });
    }
}