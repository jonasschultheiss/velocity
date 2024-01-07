import type { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  pgTableCreator,
  serial,
  smallint,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { env } from '../env.mjs';

export const psqlTable = pgTableCreator(
  (name) => `${env.DRIZZLE_TABLE_PREAMBLE}_${name}`,
);

export const SwimmerTable = pgTable('swimmers', {
  id: serial('id').primaryKey(),
  surname: varchar('surname', { length: 256 }).notNull(),
  lastname: varchar('lastname', { length: 256 }).notNull(),
  club: varchar('club', { length: 256 }),
  weight: smallint('weight'),
  height: smallint('height'),
  birthdate: timestamp('birthdate', { precision: 6, withTimezone: false }),
  bio: varchar('bio', { length: 1024 }),
  instagram: varchar('instagram', { length: 256 }),
  tiktok: varchar('tiktok', { length: 256 }),
  youtube: varchar('youtube', { length: 256 }),
  twitter: varchar('twitter', { length: 256 }),
});

export type Swimmer = InferSelectModel<typeof SwimmerTable>;
export type SwimmerName = Pick<
  InferSelectModel<typeof SwimmerTable>,
  'surname' | 'lastname'
>;
