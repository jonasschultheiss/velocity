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
import { getUserByUrlIdentifier } from '@/lib/get-user-by-url-identifier';
import type { DefinedSearchParams } from './types/search-params.interface';

export interface SwimmerPageProperties {
  params: { urlIdentifier: string };
  searchParams: DefinedSearchParams;
}

export default async function Page({
  params: { urlIdentifier },
}: Readonly<SwimmerPageProperties>): Promise<ReactElement> {
  const result = await getUserByUrlIdentifier(urlIdentifier);

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
      <div className="mb-8">
        <section className="w-full mb-4 text-balance">
          <Typography component="h2" variant="lead">
            {club}
          </Typography>
          <Typography component="h1" variant="h1">
            {surname} {lastname}
          </Typography>
        </section>
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={`Image of the swimmer ${surname} ${lastname}`}
              className="object-cover object-top rounded-lg"
              fill
              priority
              src="/swimmers/cameron_mcevoy.jpeg"
            />
          </AspectRatio>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-x-4">
        <div className="grid grid-cols-3 gap-4 md:flex md:flex-col">
          <InfoCard unit="kg" value={weight?.toString()} />
          <InfoCard unit="cm" value={height?.toString()} />
          <InfoCard unit="ans" value={birthdate?.toISOString()} />
          <SocialCard socials={socials} />
        </div>
        <div className="col-span-3">
          <Card>
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
        </div>
      </div>
    </>
  );
}
