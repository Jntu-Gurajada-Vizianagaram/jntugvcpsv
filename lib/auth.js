import crypto from "crypto";
import { cookies } from "next/headers";

const AUTH_COOKIE = "jntugvcpsv_admin_session";
const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || "admin";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "jntugv@123";
const AUTH_SECRET = process.env.AUTH_SECRET || "jntugvcpsv-local-secret";

function sign(value) {
  return crypto.createHmac("sha256", AUTH_SECRET).update(value).digest("hex");
}

export function getAuthCookieName() {
  return AUTH_COOKIE;
}

export function getAdminCredentialsHint() {
  return {
    username: DEFAULT_USERNAME,
    passwordConfigured: Boolean(process.env.ADMIN_PASSWORD)
  };
}

export async function createSessionToken(username) {
  const payload = `${username}:${Date.now()}`;
  return `${payload}:${sign(payload)}`;
}

export async function verifySessionToken(token) {
  if (!token) {
    return false;
  }

  const parts = token.split(":");
  if (parts.length < 3) {
    return false;
  }

  const signature = parts.pop();
  const payload = parts.join(":");
  const expected = sign(payload);

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
}

export async function authenticate(username, password) {
  return username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD;
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  return verifySessionToken(token);
}
