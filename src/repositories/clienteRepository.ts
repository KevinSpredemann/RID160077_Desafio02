import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type ClienteCreateInput = Prisma.ClienteCreateInput;
type ClienteUpdateInput = Prisma.ClienteUpdateInput;

export class ClienteRepository extends BaseRepository<
  'cliente',
  ClienteCreateInput,
  ClienteUpdateInput
> {
  constructor() {
    super(prisma, 'cliente');
  }
}
