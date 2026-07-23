import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GuideProjectSubmissionForm from "./GuideProjectSubmissionForm";

export interface SunriseProfile {
	email: string;
	firstName: string;
	lastName: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	stateProvince: string;
	zipPostalCode: string;
	country: string;
	birthday: string;
}

function stringValue(...values: unknown[]): string {
	for (const value of values) {
		if (typeof value === "string") return value;
	}
	return "";
}

function objectValue(value: unknown): Record<string, unknown> {
	return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

async function getCurrentUserProfile(token: string): Promise<SunriseProfile | null> {
	const res = await fetch("https://auth.hackclub.com/api/v1/me", {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) return null;
	const user = await res.json();
	const identity = objectValue(user.identity);
	const address = objectValue(identity.address ?? identity.primary_address);

	const email = stringValue(identity.primary_email, identity.email).toLowerCase();
	if (!email) return null;

	return {
		email,
		firstName: stringValue(identity.first_name, identity.firstName),
		lastName: stringValue(identity.last_name, identity.lastName),
		addressLine1: stringValue(address.address1, address.line1, address.address_line_1),
		addressLine2: stringValue(address.address2, address.line2, address.address_line_2),
		city: stringValue(address.city),
		stateProvince: stringValue(address.state, address.province, address.state_province),
		zipPostalCode: stringValue(address.zip, address.postal_code, address.zip_code),
		country: stringValue(address.country),
		birthday: stringValue(identity.birthdate, identity.birthday).slice(0, 10),
	};
}

export default async function SubmitGuideProjectPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("sunrise_token")?.value;

	if (!token) {
		redirect("/sunrise/guide-project");
	}

	const profile = await getCurrentUserProfile(token);

	if (!profile) {
		redirect("/sunrise/guide-project");
	}

	return <GuideProjectSubmissionForm profile={profile} />;
}
