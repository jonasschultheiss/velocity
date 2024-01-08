import { and, ilike } from 'drizzle-orm';
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
import { db } from 'src/db';
import { SwimmerTable } from 'src/db/schema';
import { urlIdentifierToName } from '@/lib/utils';
import type { DefinedSearchParams } from './types/search-params.interface';

export interface SwimmerPageProperties {
  params: { urlIdentifier: string };
  searchParams: DefinedSearchParams;
}

export default async function Page({
  params: { urlIdentifier },
}: Readonly<SwimmerPageProperties>): Promise<ReactElement> {
  const name = urlIdentifierToName(urlIdentifier);
  const result = await db.query.SwimmerTable.findFirst({
    where: and(
      ilike(SwimmerTable.surname, name.surname),
      ilike(SwimmerTable.lastname, name.lastname),
    ),
  });

  if (!result) {
    notFound();
  }

  const {
    surname,
    lastname,
    club,
    weight,
    height,
    birthdate,
    bio,
    ...socials
  } = result;

  return (
    <>
      <section className="w-full mb-4 text-balance">
        <Typography component="h2" variant="lead">
          {club}
        </Typography>
        <Typography component="h1" variant="h1">
          {surname} {lastname}
        </Typography>
      </section>

      {urlIdentifier === 'cameron_mcevoy' && (
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={`Image of the swimmer ${surname} ${lastname}`}
              className="object-cover object-top rounded"
              fill
              src={`/swimmers/${urlIdentifier}.jpeg`}
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
    </>
  );
}
