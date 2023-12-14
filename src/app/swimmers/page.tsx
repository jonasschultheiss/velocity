import { TableWrapper } from '@/components/swimmer-table/table-wrapper';
import { Typography } from '@/components/typography';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Typography variant="h1" component="h1">
        All swimmers
      </Typography>
      <Typography variant="p" component="p">
        This data table
      </Typography>
      <Suspense
        fallback={
          <Typography variant="muted" component="span">
            Loading
          </Typography>
        }
      >
        <TableWrapper />
      </Suspense>
    </div>
  );
}
