import { sql } from '@vercel/postgres';
import 'dotenv/config';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { db } from '.';

async function runMigrations(): Promise<void> {
  await migrate(db, { migrationsFolder: './src/db/migrations' });
  await sql.end();
}

void runMigrations();
