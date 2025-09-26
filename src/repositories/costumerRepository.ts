import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { BaseRepository } from "./baseRepository";

type ClientCreateInput = Prisma.ClienteCreateInput;
type ClientUpdateInput = Prisma.ClienteUpdateInput;

export class ClientRepository extends BaseRepository<"cliente", ClientCreateInput, ClientUpdateInput> {
    constructor() {
        super(prisma, "cliente");
    }
}

