import type { Swimmer } from 'src/db/schema';

export async function getUserByUrlIdentifier(
  urlIdentifier: string,
): Promise<Swimmer | undefined> {
  const response = await fetch(`/api/swimmers/${urlIdentifier}`);
  const { swimmer } = (await response.json()) as {
    swimmer: Swimmer | undefined;
  };
  return swimmer;
}
