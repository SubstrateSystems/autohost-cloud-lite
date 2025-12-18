import { NextResponse } from "next/server";
import { backendFetch, proxySetCookie } from "@/lib/api";
import { clearAccessTokenCookie, clearRefreshTokenCookie, setAccessTokenCookie, getRefreshTokenFromCookie, setRefreshTokenCookie } from "@/lib/cookies";

export async function POST() {
  const refreshToken = await getRefreshTokenFromCookie();
  
  if (!refreshToken) {
    console.log("[REFRESH] No refresh token found");
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  console.log("[REFRESH] Refreshing with token:", refreshToken.substring(0, 20) + "...");

  // Enviar el refresh_token al backend
  const res = await backendFetch("/v1/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  
  const data = await res.json().catch(() => ({}));

  console.log("[REFRESH] Response status:", res.status);
  console.log("[REFRESH] Has access_token:", !!data?.access_token);

  if (res.ok && data?.access_token) {
    console.log("[REFRESH] Setting new access token");
    await setAccessTokenCookie(data.access_token);
    
    // Si viene un nuevo refresh_token, actualizarlo
    if (data?.refresh_token) {
      console.log("[REFRESH] Updating refresh token");
      await setRefreshTokenCookie(data.refresh_token);
    }
  } else {
    console.log("[REFRESH] Failed, clearing cookies");
    await clearAccessTokenCookie();
    await clearRefreshTokenCookie();
  }

  const out = NextResponse.json(data, { status: res.status });
  await proxySetCookie(res, out);

  return out;
}
