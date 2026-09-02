import { getRandomUnreviewedProject, toProjectGroupDTO } from "@/app/lib/airtable";
import { getUsername } from "@/app/lib/session";

export async function GET(request: Request) {
  const username = await getUsername();
  if (!username) return Response.json({ error: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const excludeGroupKey = searchParams.get("excludeGroupKey") ?? undefined;

  try {
    const group = await getRandomUnreviewedProject(username, excludeGroupKey);
    return Response.json({ project: group ? toProjectGroupDTO(group) : null });
  } catch (err) {
    console.error("[skip-project] Airtable error:", err);
    return Response.json({ error: "Failed to load a project to skip to" }, { status: 500 });
  }
}
