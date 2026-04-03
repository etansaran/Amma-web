type Entry = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, Entry>();

function getClientKey(request: Request, scope: string) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  const realIp = request.headers.get("x-real-ip") || "";
  const ip = forwarded.split(",")[0]?.trim() || realIp || "local";
  return `${scope}:${ip}`;
}

export function checkRateLimit(
  request: Request,
  scope: string,
  limit: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfter: number } {
  const key = getClientKey(request, scope);
  const now = Date.now();
  const current = memoryStore.get(key);

  if (!current || current.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (current.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  memoryStore.set(key, current);
  return { ok: true };
}
