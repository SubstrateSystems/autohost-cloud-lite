import { NextResponse } from "next/server";
import { logoutBackend } from "@/lib/api/auth";
import { proxySetCookie } from "@/lib/api";
import { clearAccessTokenCookie, clearRefreshTokenCookie, getAccessTokenFromCookie } from "@/lib/cookies";

export async function POST() {
  const accessToken = await getAccessTokenFromCookie();

  if (accessToken) {
    console.log("[LOGOUT] Calling backend logout...");
    const res = await logoutBackend(accessToken);
    
    // Status 204 no puede tener body
    let out: NextResponse;
    if (res.status === 204) {
      console.log("[LOGOUT] Backend returned 204 No Content");
      out = new NextResponse(null, { status: 204 });
    } else {
      const data = await res.json().catch(() => ({}));
      console.log("[LOGOUT] Backend response:", data);
      out = NextResponse.json(data, { status: res.status });
    }
    
    // El backend Go elimina su refresh_token via Set-Cookie, lo pasamos al cliente
    await proxySetCookie(res, out);
    
    // Next.js elimina sus propias cookies
    console.log("[LOGOUT] Clearing Next.js cookies...");
    await clearAccessTokenCookie();
    await clearRefreshTokenCookie();
    console.log("[LOGOUT] Cookies cleared successfully");
    
    return out;
  }

  // Si no hay token, limpiamos nuestras cookies
  console.log("[LOGOUT] No access token found, clearing cookies anyway...");
  await clearAccessTokenCookie();
  await clearRefreshTokenCookie();
  console.log("[LOGOUT] Cookies cleared successfully");
  
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
