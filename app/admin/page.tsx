import { cookies } from "next/headers";
import AdminDashboard from "./AdminDashboard";

async function getAdminEmails(): Promise<string[]> {
	const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ADMIN_TABLE_ID}`;
	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
		cache: "no-store",
	});
	if (!res.ok) return [];
	const data = await res.json();
	return (data.records ?? [])
		.map((r: { fields: { email?: string } }) => r.fields.email?.toLowerCase())
		.filter(Boolean);
}

async function getCurrentUserEmail(token: string): Promise<string | null> {
	const res = await fetch("https://auth.hackclub.com/api/v1/me", {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) {
		const body = await res.text().catch(() => "(unreadable)");
		console.log("[admin auth] /api/v1/me failed:", res.status, body);
		return null;
	}
	const user = await res.json();
	console.log("[admin auth] /api/v1/me user:", JSON.stringify(user));
	return user.identity.primary_email?.toLowerCase() ?? null;
}

function buildAuthUrl() {
	const clientId = process.env.HCA_CLIENT_ID ?? "";
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
	const redirectUri = `${baseUrl}/api/admin-callback`;
	const scopes = "openid profile email name";
	return (
		`https://auth.hackclub.com/oauth/authorize` +
		`?client_id=${encodeURIComponent(clientId)}` +
		`&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&response_type=code` +
		`&scope=${encodeURIComponent(scopes)}`
	);
}

export default async function AdminPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("hca_admin_token")?.value;

	if (!token) {
		return <SignInPage authUrl={buildAuthUrl()} />;
	}

	const [email, adminEmails] = await Promise.all([
		getCurrentUserEmail(token),
		getAdminEmails(),
	]);
    console.log(email)
	if (!email || !adminEmails.includes(email)) {
		return <AccessDenied authUrl={buildAuthUrl()} email={email} />;
	}

	return <AdminDashboard />;
}

function SignInPage({ authUrl }: { authUrl: string }) {
	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center justify-center gap-4">
			<h1 className="galindo text-blue-dark text-2xl">admin portal</h1>
			<p className="text-sm text-blue-dark">Sign in with Hack Club to continue.</p>
			<a
				href={authUrl}
				className="bg-blue-dark text-white galindo px-6 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
			>
				Sign in with Hack Club
			</a>
		</div>
	);
}

function AccessDenied({ authUrl, email }: { authUrl: string; email: string | null }) {
	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center justify-center gap-4">
			<h1 className="galindo text-blue-dark text-2xl">admin portal</h1>
			<p className="text-sm text-pink-dark font-semibold">
				{email ? `${email} is not authorized to access this page.` : "Could not verify your identity."}
			</p>
			<a
				href={authUrl}
				className="text-xs text-blue-bright underline"
			>
				Sign in with a different account
			</a>
		</div>
	);
}
