import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { TableWrapper } from '@/components/swimmer-table/table-wrapper';
import { Typography } from '@/components/typography';

export default function Page(): ReactElement {
  return (
    <div>
      <Typography component="h1" variant="h1">
        All swimmers
      </Typography>
      <Typography component="p" variant="p">
        This data table
      </Typography>
      <Suspense
        fallback={
          <Typography component="span" variant="muted">
            Loading
          </Typography>
        }
      >
        <TableWrapper />
      </Suspense>
    </div>
  );
}
