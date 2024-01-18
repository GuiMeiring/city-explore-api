import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.favorite, table => {
      table.bigIncrements('id_favorite').primary().index();
      table.integer('user_favorite').index().notNullable();
      table.integer('city_favorite').index().notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();

      table.comment('Tabela usada para armazenar cidades favoritadas do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.favorite}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.favorite)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.favorite}`);
    });
}