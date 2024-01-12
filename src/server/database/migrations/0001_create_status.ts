import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.status, table => {
      table.bigInteger('id').primary().index();
      table.string('status', 50).checkLength('<=', 50).index().notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();

      table.comment('Tabela usada para armazenar status do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.status}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.status)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.status}`);
    });
}