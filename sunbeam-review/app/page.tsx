import { redirect } from "next/navigation";
import { getNextUnreviewedProject, toProjectGroupDTO, type ProjectGroup } from "@/app/lib/airtable";
import { getUsername } from "@/app/lib/session";
import ReviewQueue from "@/app/components/ReviewQueue";

export default async function Home() {
  const username = await getUsername();
  if (!username) redirect("/login");

  let group: ProjectGroup | null = null;
  let loadFailed = false;

  try {
    group = await getNextUnreviewedProject(username);
  } catch (err) {
    console.error("[page] Airtable error:", err);
    loadFailed = true;
  }

  if (loadFailed) {
    return (
      <div className="flex h-screen items-center justify-center p-8 text-center text-neutral-500">
        <p>
          Couldn&apos;t load projects from Airtable. Check that AIRTABLE_PAT has access to the
          &quot;Sunbeam Event&quot; base in the Airtable PAT settings.
        </p>
      </div>
    );
  }

  return <ReviewQueue initialProject={group ? toProjectGroupDTO(group) : null} />;
}
