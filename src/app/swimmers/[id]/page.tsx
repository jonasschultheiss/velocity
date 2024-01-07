import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { InfoCard } from '@/components/info-card';
import { SocialCard } from '@/components/social-card';
import { Typography } from '@/components/typography';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { SwimmerGraph } from '@/components/visualisation/swimmer-graph';
// import { fetchSwimmerData } from '@/lib/fetch-swimmer-data';
import { db } from 'src/db';
import { SwimmerTable } from 'src/db/schema';
import type { SearchParams } from './types/search-params.interface';

export interface SwimmerPageProperties {
  params: { id: string };
  searchParams: SearchParams;
}

export default async function Page({
  params,
  // searchParams,
}: Readonly<SwimmerPageProperties>): Promise<ReactElement> {
  const result = await db.query.SwimmerTable.findFirst({
    where: eq(SwimmerTable.id, Number(params.id)),
  });
  if (!result) {
    notFound();
  }

  const {
    // surname,
    // lastname,
    club,
    weight,
    height,
    birthdate,
    bio,
    ...socials
  } = result;
  // const swimmerResponse = await fetchSwimmerData(
  //   searchParams,
  //   surname,
  //   lastname,
  // );

  return (
    <main className="flex flex-col mt-16 gap-y-4">
      <section className="w-full mb-4 text-balance">
        <Typography component="h2" variant="lead">
          {club}
        </Typography>
        <Typography component="h1" variant="h1">
          {result.surname} {result.lastname}
        </Typography>
      </section>

      {params.id === '1' && (
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={`Image of the swimmer ${result.surname} ${result.lastname}`}
              className="object-cover object-top rounded"
              fill
              src={`/swimmers/${params.id}.jpeg`}
            />
          </AspectRatio>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <InfoCard unit="cm" value={height?.toString()} />
        <InfoCard unit="kg" value={weight?.toString()} />
        <InfoCard unit="ans" value={birthdate?.toISOString()} />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Biography</CardTitle>
            <CardDescription>
              A concise encapsulation of the swimmer&apos;s remarkable journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Typography
              className="w-full text-pretty"
              component="p"
              variant="p"
            >
              {bio}
            </Typography>
          </CardContent>
        </Card>
        <SocialCard socials={socials} />
      </div>
      {/* <SwimmerGraph id={params.id} swimmerResponse={swimmerResponse} /> */}
    </main>
  );
}
