import { cookies } from "next/headers";
import { getAuthCookieName } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set(getAuthCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });

  return Response.json({ ok: true });
}
