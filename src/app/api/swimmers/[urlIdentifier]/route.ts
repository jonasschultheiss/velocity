import { getUserByUrlIdentifier } from '@/lib/get-user-by-url-identifier';

export async function GET(
  request: Request,
  { params }: { params: { urlIdentifier: string } },
): Promise<Response> {
  const swimmer = await getUserByUrlIdentifier(params.urlIdentifier);
  return Response.json({ swimmer });
}
