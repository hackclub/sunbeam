import { headers } from "next/headers";
import HCASignInButton from "./HCASignInButton";

export default async function HCASignIn({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { return_to } = await searchParams;
	const clientId = process.env.HCA_CLIENT_ID ?? "";
	const h = await headers();
	const forwardedHost = h.get("x-forwarded-host");
	const forwardedProto = h.get("x-forwarded-proto") ?? "https";
	const host = h.get("host") ?? "localhost:3000";
	const baseUrl = forwardedHost
		? `${forwardedProto}://${forwardedHost}`
		: host.startsWith("localhost")
		? `http://${host}`
		: `https://${host}`;
	const redirectUri = `${baseUrl}/api/organizer-callback`;
	const scopes = "openid email name profile phone birthdate address verification_status slack_id basic_info";

	// Only relative, same-site paths are honored (checked again in the callback) — anything
	// else falls through to the callback's default of /organizers.
	const returnTo = typeof return_to === "string" && return_to.startsWith("/") && !return_to.startsWith("//")
		? return_to
		: undefined;

	const authUrl =
		`https://auth.hackclub.com/oauth/authorize` +
		`?client_id=${encodeURIComponent(clientId)}` +
		`&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&response_type=code` +
		`&scope=${encodeURIComponent(scopes)}` +
		(returnTo ? `&state=${encodeURIComponent(returnTo)}` : "");

	return <HCASignInButton authUrl={authUrl} />;
}
