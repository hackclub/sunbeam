import HCASignInButton from "./HCASignInButton";

export default function HCASignIn() {
	const clientId = process.env.HCA_CLIENT_ID ?? "";
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
	const redirectUri = `${baseUrl}/api/hca-callback`;
	const scopes = "openid email name profile phone birthdate address verification_status slack_id basic_info";

	const authUrl =
		`https://auth.hackclub.com/oauth/authorize` +
		`?client_id=${encodeURIComponent(clientId)}` +
		`&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&response_type=code` +
		`&scope=${encodeURIComponent(scopes)}`;

	return <HCASignInButton authUrl={authUrl} />;
}
