import Image from 'next/image';
import { ReactNode } from 'react';
import { Swimmer } from 'src/db/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type SocialList = Pick<Swimmer, 'instagram' | 'tiktok' | 'twitter' | 'youtube'>;

export interface SocialCardProperties {
  socials: SocialList;
}

function getAllValidSocials(socials: SocialList) {
  return Object.values(socials).filter((el) => !!el);
}

export function SocialCard({ socials }: Readonly<SocialCardProperties>): ReactNode {
  if (getAllValidSocials(socials).length === 0) {
    return;
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Socials</CardTitle>
        <CardDescription>Follow the swimmer on social media</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-x-4">
        {Object.keys(socials).map((key) => {
          const value = socials[key as keyof SocialList];
          if (!value) {
            return;
          }

          return (
            <a key={key} href={value} className="flex items-center justify-center w-full py-2 border rounded-sm">
              <Image
                className="dark:invert"
                alt={`Branding logo of social media ${key}`}
                src={`/socials/${key}.svg`}
                height="24"
                width="24"
              />
            </a>
          );
        })}
      </CardContent>
    </Card>
  );
}
