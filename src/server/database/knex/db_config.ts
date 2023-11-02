import { resolve } from 'path';
import dotenv from 'dotenv';

const dotEnvFile = resolve(__dirname, '..', '..', '..', '..', '.env');

dotenv.config({ path: dotEnvFile });

export const host_db = process.env.DB_HOST;
export const port_db = Number(process.env.DB_PORT);
export const user_db = process.env.DB_USER;
export const pass_db = process.env.DB_PASS;
export const database = process.env.DB_SCHEMA;
