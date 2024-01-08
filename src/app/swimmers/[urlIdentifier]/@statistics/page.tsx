import type { ReactElement } from 'react';
import { SwimmerGraphWrapper } from '@/components/visualisation/swimmer-graph-wrapper';

export interface SwimmerStatisticsPageProperties {
  params: { urlIdentifier: string };
}

export default function Page({
  params: { urlIdentifier },
}: SwimmerStatisticsPageProperties): ReactElement {
  return <SwimmerGraphWrapper urlIdentifier={urlIdentifier} />;
}
