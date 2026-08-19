import { type NextRequest } from "next/server";

function page(title: string, message: string) {
	return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
body { font-family: "Outfit", system-ui, sans-serif; background: rgb(250,240,212); display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; }
.card { background: white; border: 4px solid #0E387A; border-radius: 24px; padding: 40px; max-width: 420px; text-align: center; }
h1 { color: #359BBF; font-size: 28px; margin: 0 0 12px; }
p { color: #0E387A; font-size: 17px; line-height: 1.5; margin: 0; }
</style>
</head>
<body>
<div class="card">
<h1>${title}</h1>
<p>${message}</p>
</div>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get("token");

	if (!token) {
		return new Response(page("Missing token", "This verification link is missing its token."), {
			status: 400,
			headers: { "Content-Type": "text/html" },
		});
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
		console.error("[verify-email] Airtable lookup error:", await findRes.text());
		return new Response(page("Something went wrong", "Please try again in a bit."), {
			status: 500,
			headers: { "Content-Type": "text/html" },
		});
	}

	const { records } = await findRes.json();
	const record = records[0];

	if (!record) {
		return new Response(page("Invalid link", "This verification link is invalid or has expired."), {
			status: 400,
			headers: { "Content-Type": "text/html" },
		});
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
			console.error("[verify-email] Airtable update error:", await updateRes.text());
			return new Response(page("Something went wrong", "Please try again in a bit."), {
				status: 500,
				headers: { "Content-Type": "text/html" },
			});
		}
	}

	return new Response(page("You're verified!", "Your email has been confirmed. See you at Sunbeam!"), {
		status: 200,
		headers: { "Content-Type": "text/html" },
	});
}
