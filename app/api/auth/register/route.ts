import { NextResponse } from "next/server";
import { backendFetch, proxySetCookie } from "@/lib/api";
import { setAccessTokenCookie } from "@/lib/cookies";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await backendFetch("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  const out = NextResponse.json(data, { status: res.status });
  await proxySetCookie(res, out);

  // Si tu backend devuelve access_token en el JSON:
  if (res.ok && data?.access_token) {
    setAccessTokenCookie(data.access_token);
  }
  return out;
}
