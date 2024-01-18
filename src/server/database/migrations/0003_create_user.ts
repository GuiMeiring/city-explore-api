import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.user, table => {
      table.bigIncrements('id_user').primary().index();
      table.string('name', 50).checkLength('<=', 50).index().notNullable().unique();
      table.string('email', 250).checkLength('<=', 250).index().notNullable().unique();
      table.integer('user_permission').index().notNullable();
      table.integer('user_status').index().notNullable();
      table.string('phone',20).checkLength('<=',20).index().notNullable().unique();
      table.string('password',30).checkLength('<=',30).index().notNullable().unique();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();

      table.comment('Tabela usada para armazenar permissão do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.user}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.user)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.user}`);
    });
}