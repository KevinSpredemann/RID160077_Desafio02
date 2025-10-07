import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { BaseRepository } from './baseRepository';

type ClientCreateInput = Prisma.ClientCreateInput;
type ClientUpdateInput = Prisma.ClientUpdateInput;

export class ClientRepository extends BaseRepository<
  'client',
  ClientCreateInput,
  ClientUpdateInput
> {
  constructor() {
    super(prisma, 'client');
  }
}
