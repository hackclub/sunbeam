import { headers } from "next/headers";
import Step2Client from "./Step2Client";

export default async function Step2() {
	const h = await headers();
	const forwardedHost = h.get("x-forwarded-host");
	const forwardedProto = h.get("x-forwarded-proto") ?? "https";
	const host = h.get("host") ?? "localhost:3000";
	const baseUrl = forwardedHost
		? `${forwardedProto}://${forwardedHost}`
		: host.startsWith("localhost")
		? `http://${host}`
		: `https://${host}`;

	const clientId = process.env.HCA_CLIENT_ID ?? "";
	const redirectUri = `${baseUrl}/api/hca-callback`;
	const scopes = "openid email name profile phone birthdate address verification_status slack_id basic_info";
	const authUrl =
		`https://auth.hackclub.com/oauth/authorize` +
		`?client_id=${encodeURIComponent(clientId)}` +
		`&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&response_type=code` +
		`&scope=${encodeURIComponent(scopes)}`;

	return <Step2Client authUrl={authUrl} />;
}
