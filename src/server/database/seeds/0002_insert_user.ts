import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.user).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const date = new Date();

  const userToInsert = user
    .map(newUser => ({ 
      name: newUser.name,
      email: newUser.email,
      user_permission: newUser.user_permission,
      user_status: newUser.user_status,
      phone: newUser.phone,
      password: newUser.password,
      createdAt: date,
      updatedAt: date
    }));


  await knex(ETableNames.user).insert(userToInsert);
  console.log(`# Insert seeds table ${ETableNames.user}`);
};

const user = [
    { 
        name: 'DEV',
        email: 'guilhermemeiringdev@gmail.com',
        user_permission: 2,
        user_status: 1,
        phone: '47996459527',
        password: 'dev123'
    }
];
