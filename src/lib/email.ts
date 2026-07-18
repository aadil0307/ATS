import type { LeadInput } from "@/lib/validation";

function escapeHtml(s: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return s.replace(/[&<>"']/g, (c) => map[c] ?? c);
}

export async function sendEmails(lead: LeadInput): Promise<boolean> {
  const key = process.env.RESEND_KEY;
  if (!key) return false;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const from = process.env.RESEND_FROM ?? "Ace Tech <hello@acetech.in>";
    const founder = process.env.FOUNDER_EMAIL ?? "founder@acetech.in";

    const rows = [
      ["Name", lead.name],
      ["Email", lead.email],
      ["Company", lead.company || "—"],
      ["Phone", lead.phone || "—"],
      ["Services", lead.services.join(", ")],
      ["Budget", lead.budget || "—"],
      ["Source", lead.source || "—"],
    ]
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;color:#8B8BA7;font-size:12px;">${escapeHtml(k)}</td><td style="padding:6px 12px;color:#0A0A0F;">${escapeHtml(v)}</td></tr>`,
      )
      .join("");

    await resend.emails.send({
      from,
      to: [founder],
      subject: `New lead — ${lead.name}`,
      html: `<div style="font-family:Inter,Arial,sans-serif;"><h2 style="color:#1A1AFF;">New lead from ${escapeHtml(lead.name)}</h2><table style="border-collapse:collapse;width:100%;">${rows}</table><p style="white-space:pre-wrap;margin-top:12px;padding:12px;background:#F4F4FF;border-radius:8px;">${escapeHtml(lead.message)}</p></div>`,
    });

    await resend.emails.send({
      from,
      to: [lead.email],
      subject: "We got your message — Ace Tech",
      html: `<div style="font-family:Inter,Arial,sans-serif;"><h2 style="color:#1A1AFF;">Thanks, ${escapeHtml(lead.name)}.</h2><p>We received your note and will be in touch within one business day.</p><p style="color:#8B8BA7;font-size:13px;">— Ace Tech Solutions</p></div>`,
    });

    return true;
  } catch (e) {
    console.error("[email] send failed", e);
    return false;
  }
}
