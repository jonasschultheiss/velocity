import type { ChangeEvent, ReactElement } from 'react';
import { Typography } from './typography';
import { SwimmerDataSet } from './visualisation/graph';

export interface ColorPickerPairProperties {
  dataset: SwimmerDataSet;
}

export function ColorPickerPair({
  key,
  colorCode,
  // onValueChanged,
}: ColorPickerPairProperties): ReactElement {
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
          {key}
        </Typography>
        <Typography component="p" variant="muted">
          {colorCode}
        </Typography>
      </div>
    </div>
  );
}
