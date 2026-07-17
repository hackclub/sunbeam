import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminEmails } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import AdminEventsDashboard from "./admin/AdminEventsDashboard";
import EventDashboard from "./event/EventDashboard";

async function getCurrentUserEmail(token: string): Promise<string | null> {
	const res = await fetch("https://auth.hackclub.com/api/v1/me", {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) return null;
	const user = await res.json();
	return user.identity?.primary_email?.toLowerCase() ?? null;
}

export default async function StarboardPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("hca_token")?.value;

	if (!token) {
		redirect("/organizer-auth?return_to=/starboard");
	}

	const [email, adminEmails] = await Promise.all([
		getCurrentUserEmail(token),
		getAdminEmails(),
	]);

	if (email && adminEmails.includes(email)) {
		return <AdminEventsDashboard />;
	}

	const role = await getOrganizerRole();
	if (!role.ok) {
		return <AccessDenied email={email} />;
	}

	return <EventDashboard city={role.city} roles={role.roles} />;
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
