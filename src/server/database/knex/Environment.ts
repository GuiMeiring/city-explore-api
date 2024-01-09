import { Knex } from 'knex';
import { resolve } from 'path';
import * as config from './db_config';

export const development: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: config.host_db || '127.0.0.1',
    port: config.port_db || 3306,
    user: config.user_db || 'root',
    password: config.pass_db || 'root',
    database: config.database || 'api-node-type',
  },
  migrations: {
    directory: resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: resolve(__dirname, '..', 'seeds'),
  },
};

export const test: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: ':memory:',
  // {
  //   filename: resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
  // },
  migrations: {
    directory: resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: resolve(__dirname, '..', 'seeds'),
  },
  // pool: {
  //   afterCreate: (connection: any, done: Function) => {
  //     connection.run('PRAGMA foreign_keys = ON');
  //     done();
  //   }
  // }
};

export const production: Knex.Config = {
  ...development,
};
