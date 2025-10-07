import { Prisma } from '@prisma/client';
import { ClientRepository } from '../repositories/clientRepository';

const clientRepo = new ClientRepository();

type clientCreateInput = Prisma.ClientCreateInput;
type clientUpdateInput = Prisma.ClientUpdateInput;

export class ClientService {
  async create(payload: clientCreateInput) {
    return clientRepo.create(payload);
  }

  async findAll() {
    return clientRepo.findAll();
  }

  async findById(id: number) {
    const client = await clientRepo.findById(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }
    return client;
  }

  async update(id: number, data: clientUpdateInput) {
    return clientRepo.updated(id, data);
  }

  async delete(id: number) {
    return clientRepo.delete(id);
  }
}
