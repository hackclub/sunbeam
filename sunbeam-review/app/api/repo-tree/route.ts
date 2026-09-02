import { fetchRepoTree } from "@/app/lib/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codeUrl = searchParams.get("codeUrl");
  const ref = searchParams.get("ref") ?? undefined;

  const result = await fetchRepoTree(codeUrl, ref);
  return Response.json(result);
}
