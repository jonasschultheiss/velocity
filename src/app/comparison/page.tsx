import type { ReactElement } from 'react';
import { sql } from 'drizzle-orm';
import { Typography } from '@/components/typography';
import { InteractiveGraph } from '@/components/visualisation/interactive-graph';
import { SwimmerComparisonCard } from '@/components/swimmer-comparison-card';
import { db } from 'src/db';
import type { Swimmer } from 'src/db/schema';
import { SwimmerTable } from 'src/db/schema';
import { NAME_SPLIT } from '@/lib/utils';
import { getUserByUrlIdentifier } from '@/lib/get-user-by-url-identifier';

export interface SwimmerComparisonPageProperties {
  searchParams: Record<string, string>;
}

export default async function Page({
  searchParams,
}: SwimmerComparisonPageProperties): Promise<ReactElement> {
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

  const preambleBase = 'base-' as const;
  const preambleComparer = 'comparer-' as const;

  let baseSwimmer: Swimmer | undefined;
  let comparerSwimmer: Swimmer | undefined;

  const baseParam = searchParams[`${preambleBase}swimmer`];
  const comparerParam = searchParams[`${preambleComparer}swimmer`];

  if (baseParam) {
    baseSwimmer = await getUserByUrlIdentifier(baseParam);
  }

  if (comparerParam) {
    comparerSwimmer = await getUserByUrlIdentifier(comparerParam);
  }

  return (
    <>
      <SwimmerComparisonCard
        preamble={preambleBase}
        selectedSwimmer={baseSwimmer}
        swimmers={allSwimmers}
      />
      <Typography className="block my-8 text-center" component="p" variant="h1">
        VS
      </Typography>
      <SwimmerComparisonCard
        preamble={preambleComparer}
        selectedSwimmer={comparerSwimmer}
        swimmers={allSwimmers}
      />
      <InteractiveGraph data={null} />
    </>
  );
}
