import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.city, table => {
      table.bigIncrements('id_city').primary().index();
      table.string('name', 150).checkLength('<=', 150).index().notNullable().unique();
      table.string('estate', 50).checkLength('<=', 50).index();
      table.string('country', 50).checkLength('<=', 50).index().notNullable();
      table.double('lat').index().notNullable();
      table.double('lng').index().notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();

      table.comment('Tabela usada para armazenar cidades do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.city}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.city)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.city}`);
    });
}