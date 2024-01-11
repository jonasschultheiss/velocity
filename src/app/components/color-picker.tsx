import type { ChangeEvent, ReactElement } from 'react';
import { Typography } from './typography';

export interface ColorPickerProperties {
  dataKey: string;
  colorCode: string;
  onValueChanged: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ColorPicker({
  dataKey,
  colorCode,
  onValueChanged,
}: ColorPickerProperties): ReactElement {
  return (
    <div className="flex items-center justify-start">
      <input
        className="block w-8 h-12 p-0 bg-transparent border-0 appearance-none cursor-pointer"
        onChange={(e) => {
          onValueChanged(e);
        }}
        type="color"
      />
      <div>
        <Typography component="p" variant="large">
          {dataKey}
        </Typography>
        <Typography component="p" variant="muted">
          {colorCode}
        </Typography>
      </div>
    </div>
  );
}
