import { Prisma } from "@prisma/client";
import { ClienteRepository } from "../repositories/clienteRepository";

const clienteRepo = new ClienteRepository();

type ClienteCreateInput = Prisma.ClienteCreateInput;
type ClienteUpdateInput = Prisma.ClienteUpdateInput;

export class ClienteService {
  async criarCliente(payload: ClienteCreateInput) {
    return clienteRepo.criar(payload);
  }

  async listarClientes() {
    return clienteRepo.buscar();
  }
  
  async buscarClientePorId(id: number) {
    const cliente = await clienteRepo.buscarPorId(id);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }
    return cliente;
  }

  async atualizarCliente(id: number, data: ClienteUpdateInput) {
    return clienteRepo.atualizar(id, data);
  }

  async removerCliente(id: number) {
    return clienteRepo.deletar(id);
  }
}
