import { Typography } from '@/components/typography';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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

  const { surname, lastname, club, weight, height, birthdate, bio } = result;
  const swimmerResponse = await fetchSwimmerData(searchParams, surname, lastname);

  return (
    <main className="">
      <div className="lg:flex">
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
        <div className="w-full">
          <Typography variant="lead" component="h2">
            {club}
          </Typography>
          <Typography variant="h1" component="h1">
            {result.surname} {result.lastname}
          </Typography>
          <Typography variant="p" component="p">
            {bio}
          </Typography>
        </div>
      </div>
      <SwimmerGraph id={params.id} swimmerResponse={swimmerResponse} />
    </main>
  );
}
