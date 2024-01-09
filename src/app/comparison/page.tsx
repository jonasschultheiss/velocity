import Image from 'next/image';
import type { ReactElement } from 'react';
import { Typography } from '@/components/typography';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ComboBox } from '@/components/combo-box';
import { SwimmerGraphParameters } from '@/components/visualisation/swimmer-graph';
import { InteractiveGraph } from '@/components/visualisation/interactive-graph';

export default function Page(): ReactElement {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-col gap-y-4">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt="Image of the swimmer"
              className="object-cover object-top rounded-lg"
              fill
              src="/swimmers/cameron_mcevoy.jpeg"
            />
          </AspectRatio>
          <CardTitle>Cameron Mcevoy</CardTitle>
        </CardHeader>
        <CardContent className="PopoverContent">
          <ComboBox
            optionType="Swimmer"
            options={[{ value: '', label: 'uhh' }]}
          />
        </CardContent>
        <CardFooter>
          <SwimmerGraphParameters
            possibleOptions={{
              'S-50': true,
              'R-50': true,
              'B-50': true,
              'F-50': true,
              'L-50': false,
              'S-25': true,
              'R-25': true,
              'B-25': false,
              'F-25': true,
              'L-25': false,
            }}
          />
        </CardFooter>
      </Card>
      <Typography className="block my-8 text-center" component="p" variant="h1">
        VS
      </Typography>
      <Card>
        <CardHeader className="flex flex-col gap-y-4">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt="Image of the swimmer"
              className="object-cover object-top rounded-lg"
              fill
              src="/swimmers/cameron_mcevoy.jpeg"
            />
          </AspectRatio>
          <CardTitle>Cameron Mcevoy</CardTitle>
        </CardHeader>
        <CardContent className="PopoverContent">
          {/* <ComboBox
            optionType="Swimmer"
            options={[{ value: '', label: 'uhh' }]}
          /> */}
        </CardContent>
        <CardFooter>
          <SwimmerGraphParameters
            possibleOptions={{
              'S-50': true,
              'R-50': true,
              'B-50': true,
              'F-50': true,
              'L-50': false,
              'S-25': true,
              'R-25': true,
              'B-25': false,
              'F-25': true,
              'L-25': false,
            }}
          />
        </CardFooter>
      </Card>
      <InteractiveGraph data={null} />
    </>
  );
}
