// Spam + abuse guards for POST /api/contact.
//
// Why: the form was taking blind POSTs from Tor exits and bulletproof hosts (5 in the
// first week of Sept 2026) — clients that fetch the page HTML but never load its CSS/JS,
// i.e. they don't run a browser. Three layers, cheapest first:
//
//   1. hidden honeypot field ("company")            — already in the form
//   2. a JS-minted, HMAC-signed, single-use token   — a non-browser can't get one
//   3. per-IP + global rate limits, content sanity  — bounds the damage if 1+2 are beaten
//
// No dependencies (node:crypto only) and all state is in-process: a restart just
// invalidates outstanding tokens, which is fine at this traffic level.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const SECRET = process.env.CONTACT_TOKEN_SECRET || randomBytes(32).toString("hex");

export const TOKEN_TTL_MS = 30 * 60 * 1000; // a token is good for 30 minutes
export const TOKEN_MIN_AGE_MS = 3000; // ...but not for the first 3s (nobody types that fast)
export const LIMITS = {
  token: { max: 20, windowMs: 60 * 60 * 1000 }, // token mints, per IP
  postHour: { max: 3, windowMs: 60 * 60 * 1000 }, // sends, per IP
  postDay: { max: 8, windowMs: 24 * 60 * 60 * 1000 },
  postGlobal: { max: 60, windowMs: 60 * 60 * 1000 }, // all IPs — caps a distributed flood
};

const sign = (payload) => createHmac("sha256", SECRET).update(payload).digest("base64url");

/** Mint a token: v1.<issuedAt>.<nonce>.<hmac> */
export function mintToken(now = Date.now()) {
  const payload = `${now}.${randomBytes(9).toString("base64url")}`;
  return `v1.${payload}.${sign(payload)}`;
}

const usedNonces = new Map(); // nonce -> expiry ms (single-use, so a token can't be replayed)

/** @returns {{ok: true} | {ok: false, reason: string}} */
export function verifyToken(token, now = Date.now()) {
  if (typeof token !== "string" || !token) return { ok: false, reason: "token_missing" };
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") return { ok: false, reason: "token_malformed" };
  const [, iat, nonce, mac] = parts;
  const expect = Buffer.from(sign(`${iat}.${nonce}`));
  const got = Buffer.from(mac);
  if (expect.length !== got.length || !timingSafeEqual(expect, got)) return { ok: false, reason: "token_bad_signature" };
  const age = now - Number(iat);
  if (!Number.isFinite(age)) return { ok: false, reason: "token_malformed" };
  if (age > TOKEN_TTL_MS) return { ok: false, reason: "token_expired" };
  if (age < TOKEN_MIN_AGE_MS) return { ok: false, reason: "token_too_fast" };

  for (const [n, exp] of usedNonces) if (exp <= now) usedNonces.delete(n);
  if (usedNonces.has(nonce)) return { ok: false, reason: "token_replayed" };
  usedNonces.set(nonce, now + TOKEN_TTL_MS);
  return { ok: true };
}

const hits = new Map(); // `${bucket}:${key}` -> number[] of timestamps

/**
 * Sliding-window counter. Records the hit and reports whether it was over the limit.
 * @returns {{ok: boolean, retryAfterSec: number}}
 */
export function rateLimit(bucket, key, now = Date.now()) {
  const { max, windowMs } = LIMITS[bucket];
  const id = `${bucket}:${key}`;
  const times = (hits.get(id) || []).filter((t) => now - t < windowMs);
  times.push(now);
  hits.set(id, times);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < 24 * 60 * 60 * 1000)) hits.delete(k);
  if (times.length <= max) return { ok: true, retryAfterSec: 0 };
  return { ok: false, retryAfterSec: Math.ceil((windowMs - (now - times[0])) / 1000) };
}

const URL_RE = /\b(?:https?:\/\/|www\.)\S+/gi; // global: used with .match() to COUNT links
const HAS_URL_RE = /\b(?:https?:\/\/|www\.)\S+/i; // non-global: used with .test(), no lastIndex state
const BBCODE_RE = /\[(?:url|link)[=\]]/i;
const CONTROL_RE = /[\x00-\x08\x0b\x0c\x0e-\x1f]/;

/**
 * Content sanity for a submission that already passed the honeypot + token.
 * Deliberately returns a fixable message — a real person who pasted three links
 * should be told, not silently dropped.
 * @returns {{ok: true} | {ok: false, reason: string, error: string}}
 */
export function checkContent({ name, email, message }) {
  const links = message.match(URL_RE) || [];
  if (links.length > 2 || BBCODE_RE.test(message))
    return { ok: false, reason: "too_many_links", error: "Please send at most two links — or describe them and I'll follow up." };
  if (HAS_URL_RE.test(name) || name.length > 120) return { ok: false, reason: "bad_name", error: "Enter a valid name." };
  if (message.length < 20) return { ok: false, reason: "message_too_short", error: "Tell me a little more — at least a sentence." };
  if (name.toLowerCase() === message.toLowerCase()) return { ok: false, reason: "name_equals_message", error: "Tell me a little more about the project." };
  if (CONTROL_RE.test(message) || CONTROL_RE.test(name) || CONTROL_RE.test(email))
    return { ok: false, reason: "control_chars", error: "Message contains invalid characters." };
  return { ok: true };
}

/** Structured one-line log so the access-log analysis can tell rejects apart. */
export function logContact(outcome, req, extra = {}) {
  const detail = Object.entries(extra)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");
  console.log(`[contact] ${outcome} ip=${req.ip} ua=${JSON.stringify((req.get("user-agent") || "").slice(0, 80))}${detail ? " " + detail : ""}`);
}
