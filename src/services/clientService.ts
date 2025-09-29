import { Prisma } from "@prisma/client";
import { ClientRepository } from "../repositories/costumerRepository";

const clientRepo = new ClientRepository();

type ClienteCreateInput = Prisma.ClienteCreateInput;

export class ClientService {
  async createClient(payload: ClienteCreateInput) {
    return clientRepo.create(payload);
  }

  async listClients() {
    return clientRepo.findAll();
  }
}