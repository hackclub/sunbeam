import Link from "next/link";

async function verify(token: string | undefined) {
	if (!token) {
		return { ok: false, message: "This verification link is missing its token." };
	}

	const escapedToken = token.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
	const params = new URLSearchParams({
		filterByFormula: `{verification_token} = "${escapedToken}"`,
		maxRecords: "1",
	});

	const findRes = await fetch(
		`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ATTENDEE_TABLE_ID}?${params}`,
		{
			headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
			cache: "no-store",
		}
	);

	if (!findRes.ok) {
		console.error("[verify] Airtable lookup error:", await findRes.text());
		return { ok: false, message: "Something went wrong. Please try again in a bit." };
	}

	const { records } = await findRes.json();
	const record = records[0];

	if (!record) {
		return { ok: false, message: "This verification link is invalid or has expired." };
	}

	if (!record.fields.verified) {
		const updateRes = await fetch(
			`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ATTENDEE_TABLE_ID}/${record.id}`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ fields: { verified: true } }),
			}
		);

		if (!updateRes.ok) {
			console.error("[verify] Airtable update error:", await updateRes.text());
			return { ok: false, message: "Something went wrong. Please try again in a bit." };
		}
	}

	return { ok: true, message: "Your email has been confirmed. See you at Sunbeam!" };
}

export default async function VerifyPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const { token } = await searchParams;
	const result = await verify(token);

	return (
		<div
			className="outfit w-full min-h-screen flex items-center justify-center"
			style={{ backgroundColor: "rgb(250,240,212)" }}
		>
			<div
				className="relative rounded-3xl bg-white text-center"
				style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw", maxWidth: 480 }}
			>
				<p
					className="galindo"
					style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: result.ok ? "#359BBF" : "#D88127", marginBottom: "1.5vh" }}
				>
					{result.ok ? "You're verified!" : "Hmm..."}
				</p>
				<p style={{ fontSize: "1.1rem", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
					{result.message}
				</p>
				<Link href="/" style={{ color: "#359BBF", textDecoration: "underline" }}>
					Back to Sunbeam
				</Link>
			</div>
		</div>
	);
}
