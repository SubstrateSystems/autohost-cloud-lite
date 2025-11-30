import { NextResponse } from "next/server";
import { backendFetch, proxySetCookie } from "@/lib/api";
import { setAccessTokenCookie, clearAccessTokenCookie } from "@/lib/cookies";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await backendFetch("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  const out = NextResponse.json(data, { status: res.status });
  await proxySetCookie(res, out);

  if (res.ok && data?.access_token) {
    setAccessTokenCookie(data.access_token);
  } else {
    clearAccessTokenCookie();
  }
  return out;
}
