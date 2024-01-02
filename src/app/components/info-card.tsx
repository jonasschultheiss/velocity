import { Cake, Ruler, Weight } from 'lucide-react';
import { ReactNode } from 'react';
import { Typography } from './typography';
import { Card } from './ui/card';

const units = {
  cm: Ruler,
  kg: Weight,
  ans: Cake,
};

export interface InfoCardProperties {
  data: string;
  unit: keyof typeof units;
}

export function InfoCard(properties: Readonly<InfoCardProperties>): ReactNode {
  const { data, unit } = properties;

  const Icon = units[unit];

  return (
    <Card>
      <Typography className="flex flex-col items-center justify-between p-4" variant="h3" component="span">
        <Icon className="relative z-10 w-10 h-10 mb-2" />
        <Typography variant="large" component="span">
          {unit === 'ans' ? new Date(data).toLocaleDateString('de-CH') : data} {unit === 'ans' ? '' : unit}
        </Typography>
      </Typography>
    </Card>
  );
}
