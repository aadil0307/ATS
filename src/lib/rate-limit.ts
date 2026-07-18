const WINDOW_MS = 60 * 60 * 1000;
const MAX = 10;

const memory = new Map<string, { count: number; reset: number }>();

export async function rateLimit(
  key: string,
): Promise<{ ok: boolean; remaining: number }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const { Ratelimit } = await import("@upstash/ratelimit");
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({ url, token });
      const rl = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(MAX, "1 h"),
        prefix: "acetech-contact",
        analytics: false,
      });
      const r = await rl.limit(key);
      return { ok: r.success, remaining: r.remaining };
    } catch {
      // fall through to in-memory
    }
  }

  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || now > entry.reset) {
    memory.set(key, { count: 1, reset: now + WINDOW_MS });
    return { ok: true, remaining: MAX - 1 };
  }
  if (entry.count >= MAX) {
    return { ok: false, remaining: 0 };
  }
  entry.count += 1;
  return { ok: true, remaining: MAX - entry.count };
}
