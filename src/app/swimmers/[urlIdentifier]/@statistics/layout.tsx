import type { ReactElement } from 'react';

export interface SwimmerPageLayoutProperties {
  children: ReactElement;
  statistics: ReactElement;
}

export default function Layout({
  children,
}: SwimmerPageLayoutProperties): ReactElement {
  // const result = await db.query.SwimmerTable.findFirst({
  //   where: eq(SwimmerTable.id, Number(params.id)),
  //   columns: {
  //     surname: true,
  //     lastname: true,
  //   },
  // });
  // if (!result) {
  //   notFound();
  // }

  // const { surname, lastname } = result;

  // const defaultSearchParams: SearchParams = {
  //   technique: 'F',
  //   track: '25',
  // };

  // const swimmerResponse = await fetchSwimmerData(
  //   { ...defaultSearchParams, ...searchParams },
  //   surname,
  //   lastname,
  // );
  return (
    <main className="flex flex-col mt-16 mb-8 gap-y-4">
      {children}
      {/* {statistics} */}
    </main>
  );
}
