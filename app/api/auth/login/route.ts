import { NextResponse } from "next/server";
import { loginBackend } from "@/lib/api/auth";
import { clearAccessTokenCookie, setAccessTokenCookie } from "@/lib/cookies";
import { proxySetCookie } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await loginBackend(body);
  const data = await res.json().catch(() => ({}));

  console.log("[LOGIN] Response status:", res.status);
  console.log("[LOGIN] Has access_token:", !!data?.access_token);

  if (res.ok && data?.access_token) {
    console.log("[LOGIN] Setting cookie with token:", data.access_token.substring(0, 20) + "...");
    await setAccessTokenCookie(data.access_token);
  } else {
    console.log("[LOGIN] Clearing cookie");
    await clearAccessTokenCookie();
  }

  const out = NextResponse.json(data, { status: res.status });
  proxySetCookie(res, out);

  return out;
}
