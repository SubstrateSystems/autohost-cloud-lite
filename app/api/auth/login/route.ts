import { NextResponse } from "next/server";
import { loginBackend } from "@/lib/api/auth";
import { clearAccessTokenCookie, setAccessTokenCookie, setRefreshTokenCookie } from "@/lib/cookies";
import { proxySetCookie } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await loginBackend(body);
  const data = await res.json().catch(() => ({}));

  console.log("[LOGIN] Response status:", res.status);
  console.log("[LOGIN] Has access_token:", !!data?.access_token);

  const out = NextResponse.json(data, { status: res.status });

  if (res.ok && data?.access_token) {
    console.log("[LOGIN] Setting access token:", data.access_token.substring(0, 20) + "...");
    await setAccessTokenCookie(data.access_token);
    
    // Guardar refresh_token si viene en el JSON
    if (data?.refresh_token) {
      console.log("[LOGIN] Setting refresh token:", data.refresh_token.substring(0, 20) + "...");
      await setRefreshTokenCookie(data.refresh_token);
    }
    
    // Proxy del refresh_token desde el backend (para compatibilidad si el backend Go lo usa directamente)
    await proxySetCookie(res, out);
  } else {
    console.log("[LOGIN] Login failed, clearing cookies");
    await clearAccessTokenCookie();
  }

  return out;
}
