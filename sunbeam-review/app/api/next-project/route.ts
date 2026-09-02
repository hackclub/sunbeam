import { getNextUnreviewedProject, toProjectGroupDTO } from "@/app/lib/airtable";
import { getUsername } from "@/app/lib/session";

export async function GET() {
  const username = await getUsername();
  if (!username) return Response.json({ error: "unauthorized" }, { status: 401 });

  try {
    const group = await getNextUnreviewedProject(username);
    return Response.json({ project: group ? toProjectGroupDTO(group) : null });
  } catch (err) {
    console.error("[next-project] Airtable error:", err);
    return Response.json({ error: "Failed to load next project" }, { status: 500 });
  }
}
