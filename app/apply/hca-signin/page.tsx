import { headers } from "next/headers";
import HCASignInButton from "./HCASignInButton";

export default async function HCASignIn() {
	const clientId = process.env.HCA_CLIENT_ID ?? "";
	const headersList = await headers();
	const host = headersList.get("host") ?? "localhost:3000";
	const proto = host.startsWith("localhost") ? "http" : "https";
	const redirectUri = `${proto}://${host}/api/hca-callback`;
	const scopes = "openid email name profile phone birthdate address verification_status slack_id basic_info";

	const authUrl =
		`https://auth.hackclub.com/oauth/authorize` +
		`?client_id=${encodeURIComponent(clientId)}` +
		`&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&response_type=code` +
		`&scope=${encodeURIComponent(scopes)}`;

	return <HCASignInButton authUrl={authUrl} />;
}
