import { InferSelectModel } from 'drizzle-orm';
import { pgTable, pgTableCreator, serial, smallint, timestamp, varchar } from 'drizzle-orm/pg-core';
import { env } from '../env.mjs';

export const psqlTable = pgTableCreator((name) => `${env.DRIZZLE_TABLE_PREAMBLE}_${name}`);

export const swimmers = pgTable('swimmers', {
  id: serial('id').primaryKey(),
  surname: varchar('surname', { length: 256 }),
  lastname: varchar('lastname', { length: 256 }),
  club: varchar('club', { length: 256 }),
  weight: smallint('weight').notNull(),
  height: smallint('height').notNull(),
  birthdate: timestamp('birthdate', { precision: 6, withTimezone: false }).notNull(),
  bio: varchar('bio', { length: 1024 }).notNull(),
  instagram: varchar('instagram', { length: 256 }),
  tiktok: varchar('tiktok', { length: 256 }),
  youtube: varchar('youtube', { length: 256 }),
  twitter: varchar('twitter', { length: 256 }),
});

export type Swimmer = InferSelectModel<typeof swimmers>;
