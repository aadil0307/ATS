export async function verifyRecaptcha(
  token: string | undefined,
): Promise<{ ok: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET;
  // Gated: when no secret is configured (e.g. local/demo), skip verification.
  if (!secret || !token) {
    return { ok: true, score: 1 };
  }

  try {
    const res = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
      },
    );
    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
    };
    const score = typeof data.score === "number" ? data.score : 0;
    return { ok: Boolean(data.success) && score >= 0.5, score };
  } catch {
    return { ok: false, score: 0 };
  }
}
