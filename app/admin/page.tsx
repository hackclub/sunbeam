import { cookies, headers } from "next/headers";
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
	return user.identity.primary_email?.toLowerCase() ?? null;
}

async function buildAuthUrl() {
	const headerStore = await headers();
	const forwardedHost = headerStore.get("x-forwarded-host");
	const forwardedProto = headerStore.get("x-forwarded-proto") ?? "https";
	const base = forwardedHost
		? `${forwardedProto}://${forwardedHost}`
		: "http://localhost:3000";
	const clientId = process.env.HCA_CLIENT_ID ?? "";
	const redirectUri = `${base}/api/admin-callback`;
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
		return <SignInPage authUrl={await buildAuthUrl()} />;
	}

	const [email, adminEmails] = await Promise.all([
		getCurrentUserEmail(token),
		getAdminEmails(),
	]);
	if (!email || !adminEmails.includes(email)) {
		return <AccessDenied email={email} />;
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

function AccessDenied({ email }: { email: string | null }) {
	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center justify-center gap-4">
			<h1 className="galindo text-blue-dark text-2xl">admin portal</h1>
			<p className="text-sm text-pink-dark font-semibold">
				{email ? `${email} is not authorized to access this page.` : "Could not verify your identity."}
			</p>
			<a
				href="/api/admin-signout"
				className="text-xs text-blue-bright underline"
			>
				Sign in with a different account
			</a>
		</div>
	);
}
