import type { ContactPayload } from "@/types/";

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<{ ok: true }> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? "Failed to send message");
  }

  return res.json() as Promise<{ ok: true }>;
}
