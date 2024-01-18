import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.permission).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const date = new Date();

  const permissionsToInsert = pemission
    .map(newPermission => ({ 
      id_permission: newPermission.id,
      permission: newPermission.permission,
      createdAt: date,
      updatedAt: date
    }));


  await knex(ETableNames.permission).insert(permissionsToInsert);
  console.log(`# Insert seeds table ${ETableNames.permission}`);
};

const pemission = [
    { id: 1, permission: 'USER' },
    { id: 2, permission: 'ADMIN' },
];
