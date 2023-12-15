import { Typography } from '@/components/typography';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Graph from '@/components/visualisation/graph';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from 'src/db';
import { SwimmerTable } from 'src/db/schema';

export default async function Page({ params }: { params: { id: string } }) {
  const result = await db.query.SwimmerTable.findFirst({ where: eq(SwimmerTable.id, Number(params.id)) });

  if (!result) {
    notFound();
  }

  const { surname, lastname, club, weight, height, birthdate, bio } = result;
  const revalidatedData = await fetch(
    `https://www.horus-tech.com:9387/requestData?firstname=${surname}&lastname=${lastname}&track_length=50&technique=F`,
    {
      next: { revalidate: 86400 },
    },
  );

  const { mes_values: dataPoints, pred_values: regressionLine } = await revalidatedData.json();

  return (
    <main className="flex flex-col gap-y-4">
      <AspectRatio ratio={16 / 9}>
        <Image
          className="object-cover object-top rounded"
          src={`/swimmers/${params.id}.jpeg`}
          fill
          alt={`Image of the swimmer ${result.surname} ${result.lastname}`}
        />
      </AspectRatio>
      <div>
        <Typography variant="lead" component="h2">
          {club}
        </Typography>
        <Typography variant="h1" component="h1">
          {result.surname} {result.lastname}
        </Typography>
        <Typography variant="p" component="p">
          {bio}
        </Typography>
        <Graph dataPoints={dataPoints} regressionLine={regressionLine} />
      </div>
    </main>
  );
}
