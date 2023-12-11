import { Typography } from '@/components/typography';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from 'src/db';
import { swimmers } from 'src/db/schema';

export default async function Page({ params }: { params: { id: string } }) {
  const result = await db.query.swimmers.findFirst({ where: eq(swimmers.id, Number(params.id)) });

  if (!result) {
    notFound();
  }

  const { surname, lastname, club, weight, height, birthdate, bio } = result;

  return (
    <main>
      <Image
        src={`/swimmers/${params.id}.jpeg`}
        width={250}
        height={250}
        objectFit="fill"
        alt={`Image of the swimmer ${result.surname} ${result.lastname}`}
      />
      <Typography variant="h1" component="h1">
        {result.surname} {result.lastname}
      </Typography>
    </main>
  );
}
