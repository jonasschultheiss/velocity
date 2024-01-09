import { Cake, Ruler, Weight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Typography } from './typography';
import { Card } from './ui/card';

const units = {
  cm: Ruler,
  kg: Weight,
  ans: Cake,
};

export interface InfoCardProperties {
  value?: string;
  unit: keyof typeof units;
}

export function InfoCard(properties: InfoCardProperties): ReactNode {
  const { value, unit } = properties;
  const Icon = units[unit];
  let displayedValue = '';

  if (!value) {
    displayedValue = 'N/A';
  } else if (unit === 'ans') {
    displayedValue = new Date(value).toLocaleDateString('de-CH');
  } else {
    displayedValue = `${value} ${unit}`;
  }

  return (
    <Card>
      <Typography
        className="flex flex-col items-center justify-between p-4"
        component="span"
        variant="h3"
      >
        <Icon className="relative z-10 w-10 h-10 mb-2" />
        <Typography component="span" variant="large">
          {displayedValue}
        </Typography>
      </Typography>
    </Card>
  );
}
