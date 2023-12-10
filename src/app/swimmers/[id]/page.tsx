import { Typography } from '@/components/typography';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { db } from 'src/db';
import { swimmers } from 'src/db/schema';

export default async function Page({ params }: { params: { id: string } }) {
  const result = await db.query.swimmers.findFirst({ where: eq(swimmers.id, Number(params.id)) });

  if (!result) {
    notFound();
  }

  return (
    <main>
      <Typography variant="h1" component="h1">
        {result?.surname}
        {result?.lastname}
      </Typography>
    </main>
  );
}
