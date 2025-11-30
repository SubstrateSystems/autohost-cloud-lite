import { NextResponse } from "next/server";
import { backendFetch, proxySetCookie } from "@/lib/api";
import { clearAccessTokenCookie } from "@/lib/cookies";

export async function POST() {
  const res = await backendFetch("/v1/auth/logout", { method: "POST" });

  const data = await res.json().catch(() => ({}));
  const out = NextResponse.json(data, { status: res.status });

  await proxySetCookie(res, out);
  clearAccessTokenCookie();

  return out;
}
