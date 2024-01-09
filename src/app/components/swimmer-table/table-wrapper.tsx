import type { ReactElement } from 'react';
import { swimmerColumns } from '@/components/swimmer-table/columns';
import { DataTable } from '@/components/swimmer-table/data-table';
import { db } from 'src/db';

export async function TableWrapper(): Promise<ReactElement> {
  const result = await db.query.SwimmerTable.findMany();

  return <DataTable columns={swimmerColumns} data={result} />;
}
