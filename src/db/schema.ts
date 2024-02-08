import { sql } from 'drizzle-orm';
import type { SQL, InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  pgTableCreator,
  primaryKey,
  smallint,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';
import { NAME_SPLIT } from '@/lib/utils';
import { env } from '../env.mjs';

export const psqlTable = pgTableCreator(
  (name) => `${env.DRIZZLE_TABLE_PREAMBLE}_${name}`,
);

const defaultVarcharLength = 256;

export const SwimmerTable = pgTable(
  'swimmers',
  {
    surname: varchar('surname', { length: defaultVarcharLength }).notNull(),
    lastname: varchar('lastname', { length: defaultVarcharLength }).notNull(),
    club: varchar('club', { length: defaultVarcharLength }),
    weight: smallint('weight'),
    height: smallint('height'),
    birthdate: timestamp('birthdate', { precision: 6, withTimezone: false }),
    bio: varchar('bio', { length: defaultVarcharLength * 4 }),
    image: varchar('image', { length: defaultVarcharLength * 4 }),
    instagram: varchar('instagram', { length: defaultVarcharLength }),
    tiktok: varchar('tiktok', { length: defaultVarcharLength }),
    youtube: varchar('youtube', { length: defaultVarcharLength }),
    twitter: varchar('twitter', { length: defaultVarcharLength }),
  },
  (t) => ({
    uniqueNameCombination: unique().on(t.surname, t.lastname),
    pk: primaryKey({ name: 'identifier', columns: [t.surname, t.lastname] }),
  }),
);

export type Swimmer = InferSelectModel<typeof SwimmerTable>;

export interface SwimmerWithExtras extends Swimmer {
  surname: string;
  lastname: string;
  club: string | null;
  weight: number | null;
  height: number | null;
  birthdate: Date | null;
  bio: string | null;
  image: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  twitter: string | null;
  urlIdentifier: string;
  fullName: string;
}

export type SwimmerName = Pick<
  InferSelectModel<typeof SwimmerTable>,
  'surname' | 'lastname'
>;

export function withURLIdentifier(): Record<string, SQL.Aliased<string>> {
  return {
    urlIdentifier:
      sql<string>`lower(${SwimmerTable.surname}) || ${NAME_SPLIT} || lower(${SwimmerTable.lastname})`.as(
        'urlIdentifier',
      ),
  };
}

export function withFullName(): Record<string, SQL.Aliased<string>> {
  return {
    fullName:
      sql<string>`${SwimmerTable.surname} || ' ' || ${SwimmerTable.lastname}`.as(
        'fullName',
      ),
  };
}
