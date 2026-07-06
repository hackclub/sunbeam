import { requireAdmin } from "@/app/lib/admin-auth";

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id, email, message, status } = await request.json();

  if (!id || !email || !message) {
    return Response.json({ error: "invalid request" }, { status: 400 });
  }

  const emailRes = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/follow_up_emails`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { email, message, status } }),
    }
  );

  if (!emailRes.ok) {
    const err = await emailRes.text();
    console.error("[send-follow-up-email] Airtable error:", err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  const statusUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}/${id}`;
  const statusRes = await fetch(statusUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: { approve_as_org: "needs_follow_up" } }),
  });

  if (!statusRes.ok) {
    const err = await statusRes.text();
    console.error("[send-follow-up-email] status update error:", err);
    return Response.json({ error: "Email sent but failed to update status" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
