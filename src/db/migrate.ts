import { sql } from '@vercel/postgres';
import 'dotenv/config';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { db } from '.';

async function runMigrations() {
  await migrate(db, { migrationsFolder: './src/db/migrations' });
  await sql.end();
}

runMigrations();
