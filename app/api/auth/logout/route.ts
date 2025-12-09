import { NextResponse } from "next/server";
import { logoutBackend } from "@/lib/api/auth";
import {proxySetCookie } from "@/lib/api";
import { clearAccessTokenCookie, getAccessTokenFromCookie } from "@/lib/cookies";

export async function POST() {
  const accessToken = await getAccessTokenFromCookie();

  if (accessToken) {
    const res = await logoutBackend(accessToken);
    const data = await res.json().catch(() => ({}));
    const out = NextResponse.json(data, { status: res.status });
    proxySetCookie(res, out);
    await clearAccessTokenCookie();
    return out;
  }

  await clearAccessTokenCookie();
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
