import Redis from "ioredis";

function getRedisClient() {
  if (global._redis) return global._redis;

  global._redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
  });

  global._redis.on("error", (err) =>
    console.error("[Redis] Connection error:", err.message),
  );

  global._redis.on("connect", () => console.log("[Redis] Connected"));

  return global._redis;
}

const redis = getRedisClient();

// ── Blacklist helpers ──────────────────────────────────────────

export const setBlacklist = async (token, ttlSeconds) => {
  await redis.set(`bl:${token}`, "1", "EX", ttlSeconds);
};

export const isBlacklisted = async (token) => {
  const val = await redis.get(`bl:${token}`);
  return val !== null;
};

export { redis };
export default redis;
