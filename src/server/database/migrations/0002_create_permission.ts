import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.permission, table => {
      table.bigInteger('id_permission').primary().index();
      table.string('permission', 15).checkLength('<=', 15).index().notNullable().unique();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();

      table.comment('Tabela usada para armazenar permissão do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.permission}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.permission)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.permission}`);
    });
}