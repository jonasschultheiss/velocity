import { swimmerColumns } from '@/components/swimmer-table/columns';
import { DataTable } from '@/components/swimmer-table/data-table';
import { db } from 'src/db';

export async function TableWrapper() {
  const result = await db.query.swimmers.findMany({ limit: 10 });

  return <DataTable columns={swimmerColumns} data={result} />;
}
