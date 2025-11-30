import { NextResponse } from "next/server";
import { backendFetch, proxySetCookie } from "@/lib/api";
import { setAccessTokenCookie, clearAccessTokenCookie } from "@/lib/cookies";

export async function POST() {
  const res = await backendFetch("/v1/auth/refresh", { method: "POST" });

  const data = await res.json().catch(() => ({}));
  const out = NextResponse.json(data, { status: res.status });

  // Propaga cualquier Set-Cookie (si el backend actualiza refresh cookie)
  await proxySetCookie(res, out);

  if (res.ok && data?.access_token) {
    setAccessTokenCookie(data.access_token);
  } else {
    clearAccessTokenCookie();
  }
  return out;
}
