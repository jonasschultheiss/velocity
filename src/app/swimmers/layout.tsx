import type { ReactElement } from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return <main className="px-6">{children}</main>;
}
