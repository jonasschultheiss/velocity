import { pgTable, pgTableCreator, serial, varchar } from 'drizzle-orm/pg-core';
import { env } from '../env.mjs';

export const psqlTable = pgTableCreator((name) => `${env.DRIZZLE_TABLE_PREAMBLE}_${name}`);

export const swimmers = pgTable('swimmers', {
  id: serial('id').primaryKey(),
  surname: varchar('surname', { length: 256 }),
  lastname: varchar('lastname', { length: 256 }),
  birthdate: varchar('birthdate', { length: 256 }),
});
