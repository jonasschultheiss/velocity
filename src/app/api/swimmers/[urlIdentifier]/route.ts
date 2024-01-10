import { and, ilike } from 'drizzle-orm';
import { urlIdentifierToName } from '@/lib/utils';
import { db } from 'src/db';
import { SwimmerTable } from 'src/db/schema';

export async function GET(
  request: Request,
  { params }: { params: { urlIdentifier: string } },
): Promise<Response> {
  const name = urlIdentifierToName(params.urlIdentifier);
  const swimmer = await db.query.SwimmerTable.findFirst({
    where: and(
      ilike(SwimmerTable.surname, name.surname),
      ilike(SwimmerTable.lastname, name.lastname),
    ),
  });
  return Response.json({ swimmer });
}
