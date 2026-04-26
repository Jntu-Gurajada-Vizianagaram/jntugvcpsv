import { cookies } from "next/headers";
import { authenticate, createSessionToken, getAuthCookieName } from "@/lib/auth";

export async function POST(request) {
  const { username, password } = await request.json();

  if (!(await authenticate(username, password))) {
    return Response.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = await createSessionToken(username);
  const cookieStore = await cookies();

  cookieStore.set(getAuthCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return Response.json({ ok: true });
}
