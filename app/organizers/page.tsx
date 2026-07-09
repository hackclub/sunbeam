import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrganizersDashboard from "./OrganizersDashboard";

async function getApprovedOrganizers(): Promise<{ email: string; city: string | null }[]> {
	const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}`;
	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
		cache: "no-store",
	});
	if (!res.ok) return [];
	const data = await res.json();
	return (data.records ?? [])
		.filter((r: { fields: { approve_as_org?: string } }) => r.fields.approve_as_org === "approved")
		.map((r: { fields: { email?: string; approved_city?: string } }) => ({
			email: r.fields.email?.toLowerCase() ?? "",
			city: r.fields.approved_city ?? null,
		}))
		.filter((r: { email: string }) => r.email);
}

async function getCurrentUser(token: string): Promise<{ email: string | null; name: string | null }> {
	const res = await fetch("https://auth.hackclub.com/api/v1/me", {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) return { email: null, name: null };
	const user = await res.json();
	return {
		email: user.identity?.primary_email?.toLowerCase() ?? null,
		name: user.identity?.preferred_name || user.identity?.first_name || null,
	};
}

export default async function OrganizersPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("hca_token")?.value;

	if (!token) {
		redirect("/organizer-auth");
	}

	const [user, organizers] = await Promise.all([
		getCurrentUser(token),
		getApprovedOrganizers(),
	]);

	const organizer = organizers.find((o) => o.email === user.email);

	if (!user.email || !organizer) {
		return <AccessDenied email={user.email} />;
	}

	return <OrganizersDashboard name={user.name} city={organizer.city} />;
}

function AccessDenied({ email }: { email: string | null }) {
	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center justify-center gap-4">
			<h1 className="galindo text-blue-dark text-2xl">organizer portal</h1>
			<p className="text-sm text-pink-dark font-semibold">
				{email
					? `${email} is not an approved organizer yet.`
					: "Could not verify your identity."}
			</p>
			<a href="/organizer-auth" className="text-xs text-blue-bright underline">
				Sign in with a different account
			</a>
		</div>
	);
}
