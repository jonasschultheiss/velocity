import type { ReactElement } from 'react';

export interface SwimmerPageLayoutProperties {
  children: ReactElement;
  statistics: ReactElement;
}

export default function Layout({
  children,
  statistics,
}: SwimmerPageLayoutProperties): ReactElement {
  return (
    <main className="flex flex-col mt-16 mb-8 gap-y-4">
      {children}
      {statistics}
    </main>
  );
}
