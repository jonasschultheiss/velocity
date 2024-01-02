import { InfoCard } from '@/components/info-card';
import { SocialCard } from '@/components/social-card';
import { Typography } from '@/components/typography';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SwimmerGraph } from '@/components/visualisation/swimmer-graph';
import { fetchSwimmerData } from '@/lib/fetchSwimmerData';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from 'src/db';
import { SwimmerTable } from 'src/db/schema';
import { ISearchParams } from './types/search-params.interface';

export interface SwimmerPageProperties {
  params: { id: string };
  searchParams: ISearchParams;
}

export default async function Page({ params, searchParams }: Readonly<SwimmerPageProperties>) {
  const result = await db.query.SwimmerTable.findFirst({ where: eq(SwimmerTable.id, Number(params.id)) });
  if (!result) {
    notFound();
  }

  const { id, surname, lastname, club, weight, height, birthdate, bio, ...socials } = result;
  const swimmerResponse = await fetchSwimmerData(searchParams, surname, lastname);

  return (
    <main className="flex flex-col mt-16 gap-y-4">
      <section className="w-full mb-4 text-balance">
        <Typography variant="lead" component="h2">
          {club}
        </Typography>
        <Typography variant="h1" component="h1">
          {result.surname} {result.lastname}
        </Typography>
      </section>

      {params.id === '1' && (
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9}>
            <Image
              className="object-cover object-top rounded"
              src={`/swimmers/${params.id}.jpeg`}
              fill
              alt={`Image of the swimmer ${result.surname} ${result.lastname}`}
            />
          </AspectRatio>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <InfoCard data={`${height}`} unit="cm" />
        <InfoCard data={`${weight}`} unit="kg" />
        <InfoCard data={`${birthdate}`} unit="ans" />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Biography</CardTitle>
            <CardDescription>A concise encapsulation of the swimmer&apos;s remarkable journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="p" component="p" className="w-full text-pretty">
              {bio}
            </Typography>
          </CardContent>
        </Card>
        <SocialCard socials={socials} />
      </div>
      <SwimmerGraph id={params.id} swimmerResponse={swimmerResponse} />
    </main>
  );
}
