import { NextResponse } from "next/server";
import { backendFetch, proxySetCookie } from "@/lib/api";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@/lib/cookies";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await backendFetch("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  console.log("[REGISTER] Response status:", res.status);
  console.log("[REGISTER] Has access_token:", !!data?.access_token);

  const out = NextResponse.json(data, { status: res.status });

  if (res.ok && data?.access_token) {
    console.log("[REGISTER] Setting access token:", data.access_token.substring(0, 20) + "...");
    await setAccessTokenCookie(data.access_token);
    
    // Guardar refresh_token si viene en el JSON
    if (data?.refresh_token) {
      console.log("[REGISTER] Setting refresh token:", data.refresh_token.substring(0, 20) + "...");
      await setRefreshTokenCookie(data.refresh_token);
    }
    
    // Proxy del refresh_token desde el backend (para compatibilidad si el backend Go lo usa directamente)
    await proxySetCookie(res, out);
  }
  
  return out;
}
