import { Prisma } from "@prisma/client";
import { ClientRepository } from "../repositories/costumerRepository";

const costumerRepo = new ClientRepository();

type costumerCreateInput = Prisma.ClienteCreateInput;

export class CostumerService {
  async createClient(payload: costumerCreateInput) {
    return costumerRepo.create(payload);
  }

  async listClients() {
    return costumerRepo.findAll();
  }
}