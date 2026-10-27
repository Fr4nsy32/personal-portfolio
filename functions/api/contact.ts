import type { ContactPayload } from "../../src/types";

interface Env {
  DISCORD_WEBHOOK_URL: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: Partial<ContactPayload>;
  try {
    data = await request.json<Partial<ContactPayload>>();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { name, email, subject, message } = data;
  if (!name || !email || !message) {
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

  const res = await fetch(env.DISCORD_WEBHOOK_URL, {
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
};
