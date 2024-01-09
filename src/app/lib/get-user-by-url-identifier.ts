import { and, ilike } from 'drizzle-orm';
import { db } from 'src/db';
import type { Swimmer } from 'src/db/schema';
import { SwimmerTable } from 'src/db/schema';
import { urlIdentifierToName } from './utils';

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
