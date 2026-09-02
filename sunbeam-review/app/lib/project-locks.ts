import "server-only";

// A dead-simple in-memory "who's reviewing what" lock. Good enough for a handful of reviewers
// hitting a single Next.js server — no Redis, no DB table, just a module-level Map that lives
// for the life of the process. Locks expire on their own after LOCK_TTL_MS so a reviewer who
// closes their tab mid-review doesn't block that project forever.
const LOCK_TTL_MS = 20 * 60 * 1000; // 20 minutes

type Lock = { username: string; lockedAt: number };

const locks = new Map<string, Lock>();

function isExpired(lock: Lock): boolean {
  return Date.now() - lock.lockedAt > LOCK_TTL_MS;
}

export function isLockedByOther(groupKey: string, username: string): boolean {
  const lock = locks.get(groupKey);
  if (!lock || isExpired(lock)) return false;
  return lock.username !== username;
}

// A reviewer only ever works on one project at a time, so picking up a new one releases
// whatever they previously held.
export function acquireLock(groupKey: string, username: string): void {
  for (const [key, lock] of locks) {
    if (lock.username === username && key !== groupKey) locks.delete(key);
  }
  locks.set(groupKey, { username, lockedAt: Date.now() });
}

export function releaseLock(groupKey: string, username: string): void {
  const lock = locks.get(groupKey);
  if (lock && lock.username === username) locks.delete(groupKey);
}
