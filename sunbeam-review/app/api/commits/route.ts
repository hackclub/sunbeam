import { fetchRecentCommits } from "@/app/lib/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codeUrl = searchParams.get("codeUrl");

  const result = await fetchRecentCommits(codeUrl);
  return Response.json(result);
}
