import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrganizersDashboard from "./OrganizersDashboard";
import { getAdminEmails } from "@/app/lib/admin-auth";

async function getApprovedOrganizers(): Promise<{ email: string; name: string | null; city: string | null }[]> {
	const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}`;
	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
		cache: "no-store",
	});
	if (!res.ok) return [];
	const data = await res.json();
	return (data.records ?? [])
		.filter((r: { fields: { approve_as_org?: string } }) => r.fields.approve_as_org === "approved")
		.map((r: { fields: { email?: string; preferred_name?: string; first_name?: string; approved_city?: string } }) => ({
			email: r.fields.email?.toLowerCase() ?? "",
			name: r.fields.preferred_name || r.fields.first_name || null,
			city: r.fields.approved_city ?? null,
		}))
		.filter((r: { email: string }) => r.email);
}

async function getCurrentUserEmail(token: string): Promise<string | null> {
	const res = await fetch("https://auth.hackclub.com/api/v1/me", {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) return null;
	const user = await res.json();
	return user.identity?.primary_email?.toLowerCase() ?? null;
}

export default async function OrganizersPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("hca_token")?.value;

	if (!token) {
		redirect("/organizer-auth");
	}

	const [email, organizers, adminEmails] = await Promise.all([
		getCurrentUserEmail(token),
		getApprovedOrganizers(),
		getAdminEmails(),
	]);

	const organizer = organizers.find((o) => o.email === email);
	const isAdmin = !!email && adminEmails.includes(email);

	if (!email || (!organizer && !isAdmin)) {
		return <AccessDenied email={email} />;
	}

	return <OrganizersDashboard name={organizer?.name ?? null} city={organizer?.city ?? null} />;
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
