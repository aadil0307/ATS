import { NextResponse, type NextRequest } from "next/server";
import sanitizeHtml from "sanitize-html";
import { contactSchema, type LeadInput } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { getDb } from "@/lib/db";
import { sendEmails } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }

  const { recaptchaToken, ...lead } = parsed.data;

  // Server-side XSS sanitization (strip all tags)
  const clean: LeadInput = {
    ...lead,
    message: sanitizeHtml(lead.message, {
      allowedTags: [],
      allowedAttributes: {},
    }),
  };

  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = await rateLimit(`contact:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // reCAPTCHA (gated — passes when unconfigured)
  const rc = await verifyRecaptcha(recaptchaToken);
  if (!rc.ok) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 401 },
    );
  }

  // Persist
  let id: string | undefined;
  const db = await getDb();
  if (db) {
    const col = db.collection("leads");
    const doc = {
      ...clean,
      status: "new",
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") ?? "",
      recaptchaScore: rc.score,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const r = await col.insertOne(doc);
    id = r.insertedId.toString();
  }

  // Email
  let emailed = false;
  try {
    emailed = await sendEmails(clean);
  } catch (e) {
    console.error("[contact] email step failed", e);
  }

  if (!db && !emailed) {
    console.info("[demo lead]", clean);
  }

  return NextResponse.json({
    success: true,
    id,
    demo: !db && !emailed,
  });
}
