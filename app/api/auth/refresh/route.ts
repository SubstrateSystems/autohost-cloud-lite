import { NextResponse } from "next/server";
import { refreshTokenBackend } from "@/lib/api/auth";
import { clearAccessTokenCookie, setAccessTokenCookie } from "@/lib/cookies";
import { proxySetCookie } from "@/lib/api";

export async function POST() {
  const res = await refreshTokenBackend();
  const data = await res.json().catch(() => ({}));

  console.log("[REFRESH] Response status:", res.status);
  console.log("[REFRESH] Has access_token:", !!data?.access_token);

  if (res.ok && data?.access_token) {
    console.log("[REFRESH] Setting new access token");
    await setAccessTokenCookie(data.access_token);
  } else {
    console.log("[REFRESH] Failed, clearing cookies");
    await clearAccessTokenCookie();
  }

  const out = NextResponse.json(data, { status: res.status });
  proxySetCookie(res, out);

  return out;
}
