import { type Config } from 'drizzle-kit';

import { env } from './src/env.mjs';

export default {
  schema: './src/server/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: [`${env.DRIZZLE_TABLE_PREAMBLE}_*`],
} satisfies Config;
