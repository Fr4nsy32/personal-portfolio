import type { ContactPayload } from "@/types";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(request: Request) {
  let data: Partial<ContactPayload>;
  try {
    data = await request.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return json({ error: "Invalid JSON" }, 400);
    }
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { name, email, subject, message } = data;
  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim() ||
    (subject !== undefined && typeof subject !== "string")
  ) {
    return json({ error: "Name, email and message are required" }, 400);
  }

  const fields = [
    { name: "Name", value: String(name).slice(0, 256) },
    { name: "Email", value: String(email).slice(0, 256) },
    ...(subject
      ? [{ name: "Subject", value: String(subject).slice(0, 256) }]
      : []),
    { name: "Message", value: String(message).slice(0, 1000) },
  ];

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return json({ error: "Contact service is unavailable" }, 503);

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        allowed_mentions: { parse: [] },
        embeds: [
          {
            title: "📬 New portfolio message",
            color: 0x5865f2,
            fields,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!res.ok) return json({ error: "Failed to send to Discord" }, 502);
    return json({ ok: true });
  } catch {
    return json({ error: "Failed to send to Discord" }, 502);
  }
}
