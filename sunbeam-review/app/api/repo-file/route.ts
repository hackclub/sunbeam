import { fetchFileContent } from "@/app/lib/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codeUrl = searchParams.get("codeUrl");
  const path = searchParams.get("path");
  const ref = searchParams.get("ref") ?? undefined;

  if (!path) {
    return Response.json({ ok: false, reason: "unknown-error" }, { status: 400 });
  }

  const result = await fetchFileContent(codeUrl, path, ref);
  return Response.json(result);
}
