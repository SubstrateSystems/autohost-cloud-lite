import { NextResponse } from "next/server";
import { logoutBackend } from "@/lib/api/auth";
import { ACCESS_COOKIE, REFRESH_COOKIE, getAccessTokenFromCookie } from "@/lib/cookies";

export async function POST() {
  const accessToken = await getAccessTokenFromCookie();

  // Notificar al backend para invalidar el token (si mantiene blacklist)
  if (accessToken) {
    await logoutBackend(accessToken).catch(() => {
      // Ignorar error — igual limpiamos cookies
    });
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}
