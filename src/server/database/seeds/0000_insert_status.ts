import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.status).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const date = new Date();

  const statusToInsert = status
    .map(newStatus => ({ 
      id: newStatus.id,
      status: newStatus.status,
      createdAt: date,
      updatedAt: date
    }));


  await knex(ETableNames.status).insert(statusToInsert);
  console.log(`# Insert seeds table ${ETableNames.status}`);
};

const status = [
    { id: 1, status: 'ATIVO' },
    { id: 2, status: 'INATIVO' },
  ];