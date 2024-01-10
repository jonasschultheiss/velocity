import type { ReactElement } from 'react';
import { sql } from 'drizzle-orm';
import { db } from 'src/db';
import { SwimmerTable } from 'src/db/schema';
import { NAME_SPLIT } from '@/lib/utils';
import { DynamicComparison } from '@/components/dynamic-comparison';

export default async function Page(): Promise<ReactElement> {
  const allSwimmers = await db.query.SwimmerTable.findMany({
    extras: {
      urlIdentifier:
        sql<string>`lower(${SwimmerTable.surname}) || ${NAME_SPLIT} || lower(${SwimmerTable.lastname})`.as(
          'urlIdentifier',
        ),
      fullName:
        sql<string>`${SwimmerTable.surname} || ' ' || ${SwimmerTable.lastname}`.as(
          'fullName',
        ),
    },
  });

  return <DynamicComparison allSwimmers={allSwimmers} />;
}
