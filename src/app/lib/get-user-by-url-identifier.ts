import { and, ilike } from 'drizzle-orm';
import type { Swimmer } from 'src/db/schema';
import { db } from 'src/db';
import { SwimmerTable } from 'src/db/schema';
import { urlIdentifierToName } from './utils';

export async function getUserByUrlIdentifierViaApi(
  urlIdentifier: string,
): Promise<Swimmer | undefined> {
  const response = await fetch(`/api/swimmers/${urlIdentifier}`);
  const { swimmer } = (await response.json()) as {
    swimmer: Swimmer | undefined;
  };
  return swimmer;
}

export async function getUserByUrlIdentifier(
  urlIdentifier: string,
): Promise<Swimmer | undefined> {
  const name = urlIdentifierToName(urlIdentifier);
  return db.query.SwimmerTable.findFirst({
    where: and(
      ilike(SwimmerTable.surname, name.surname),
      ilike(SwimmerTable.lastname, name.lastname),
    ),
  });
}
