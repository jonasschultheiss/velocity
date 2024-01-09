import type { SwimmerName } from 'src/db/schema';

export interface SwimmerPossibilities {
  'S-50': boolean;
  'R-50': boolean;
  'B-50': boolean;
  'F-50': boolean;
  'L-50': boolean;
  'S-25': boolean;
  'R-25': boolean;
  'B-25': boolean;
  'F-25': boolean;
  'L-25': boolean;
}

export async function fetchPossibleOptions({
  surname,
  lastname,
}: SwimmerName): Promise<SwimmerPossibilities> {
  const response = await fetch(
    `https://www.horus-tech.com:9387/possibleOptions?firstname=${surname}&lastname=${lastname}`,
    {
      next: { revalidate: 86400 },
    },
  );

  return (await response.json()) as SwimmerPossibilities;
}
