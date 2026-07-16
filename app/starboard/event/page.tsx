import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";
import { getAdminEmails } from "@/app/lib/admin-auth";
import EventDashboard from "./EventDashboard";

type Organizer = { email: string; city: string | null; roles: string[] };

async function getApprovedOrganizers(): Promise<Organizer[]> {
	const records = await fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!).catch(() => []);
	return records
		.filter((r) => r.fields.approve_as_org === "approved")
		.map((r) => {
			const f = r.fields as { email?: string; approved_city?: string; approved_as_poc?: boolean };
			const city = f.approved_city ?? null;
			const roles = city ? [`organizer: ${city}`] : [];
			if (city && f.approved_as_poc) roles.push(`person of contact: ${city}`);
			return {
				email: f.email?.toLowerCase() ?? "",
				city,
				roles,
			};
		})
		.filter((r) => r.email);
}

async function getCurrentUserEmail(token: string): Promise<string | null> {
	const res = await fetch("https://auth.hackclub.com/api/v1/me", {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) return null;
	const user = await res.json();
	return user.identity?.primary_email?.toLowerCase() ?? null;
}

export default async function StarboardEventPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { id } = await searchParams;
	const eventId = typeof id === "string" ? id : undefined;
	const cookieStore = await cookies();

	// Admin path: viewing an arbitrary city's event (linked from /starboard/admin), gated by
	// admin auth (hca_admin_token) instead of the organizer/POC check below.
	if (eventId) {
		const adminToken = cookieStore.get("hca_admin_token")?.value;
		if (!adminToken) {
			return <AdminAccessDenied email={null} />;
		}

		const [adminEmail, adminEmails] = await Promise.all([
			getCurrentUserEmail(adminToken),
			getAdminEmails(),
		]);
		if (!adminEmail || !adminEmails.includes(adminEmail)) {
			return <AdminAccessDenied email={adminEmail} />;
		}

		return <EventDashboard eventId={eventId} city={null} roles={["admin"]} />;
	}

	const token = cookieStore.get("hca_token")?.value;

	if (!token) {
		redirect("/organizer-auth?return_to=/starboard/event");
	}

	const [email, organizers] = await Promise.all([
		getCurrentUserEmail(token),
		getApprovedOrganizers(),
	]);

	const organizer = organizers.find((o) => o.email === email);

	if (!email || !organizer) {
		return <AccessDenied email={email} />;
	}

	return <EventDashboard city={organizer.city} roles={organizer.roles} />;
}

function AdminAccessDenied({ email }: { email: string | null }) {
	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center justify-center gap-4">
			<h1 className="galindo text-blue-dark text-2xl">starboard</h1>
			<p className="text-sm text-pink-dark font-semibold">
				{email ? `${email} is not authorized to access this page.` : "Could not verify your identity."}
			</p>
			<a href="/api/starboard-signout" className="text-xs text-blue-bright underline">
				Sign in with a different account
			</a>
		</div>
	);
}

function AccessDenied({ email }: { email: string | null }) {
	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center justify-center gap-4">
			<h1 className="galindo text-blue-dark text-2xl">starboard</h1>
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
