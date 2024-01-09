import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Swimmer } from 'src/db/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type SocialList = Pick<Swimmer, 'instagram' | 'tiktok' | 'twitter' | 'youtube'>;

export interface SocialCardProperties {
  socials: SocialList;
}

function getAllValidSocials(socials: SocialList): (string | null)[] {
  return Object.values(socials).filter((el) => Boolean(el));
}

export function SocialCard({
  socials,
}: Readonly<SocialCardProperties>): ReactNode {
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
            <a
              className="flex items-center justify-center w-full py-2 border rounded-sm"
              href={value}
              key={key}
            >
              <Image
                alt={`Branding logo of social media ${key}`}
                className="dark:invert"
                height="24"
                src={`/socials/${key}.svg`}
                width="24"
              />
            </a>
          );
        })}
      </CardContent>
    </Card>
  );
}
