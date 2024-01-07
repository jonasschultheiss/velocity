import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import type { ReactElement } from 'react';
import { Typography } from '../typography';

export interface NoDataProperties {
  message?: string | null;
}
const statusMessage = {
  noData: {
    title: 'No data',
    message: 'No data available for this swimmer',
  },
  notEnoughData: {
    title: 'Not enough data',
    message:
      'There is not enough data available for this swimmer with the current selection',
  },
  noSelection: {
    title: 'Parameters not selected',
    message: 'Please select a technique and a track to view the graph',
  },
};

export function NoData({ message }: Readonly<NoDataProperties>): ReactElement {
  let currentMessage = statusMessage.noSelection;
  if (message?.includes('Not enough data')) {
    currentMessage = statusMessage.notEnoughData;
  }

  if (message?.includes('No data')) {
    currentMessage = statusMessage.noData;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      {message ? (
        <ExclamationTriangleIcon className="w-12 h-12 text-yellow-500" />
      ) : null}
      <Typography className="mt-4 not-italic" component="em" variant="large">
        {currentMessage.title}
      </Typography>
      <Typography className="max-w-xs mt-0" component="p" variant="small">
        {currentMessage.message}
      </Typography>
    </div>
  );
}
