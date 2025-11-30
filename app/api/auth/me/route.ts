import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api";
import { getAccessTokenFromCookie } from "@/lib/cookies";

export async function GET() {
  const token = await getAccessTokenFromCookie(); // 👈 aquí agregamos await
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await backendFetch("/v1/auth/me", { method: "GET" }, token);
  const data = await res.json().catch(() => ({}));

  return NextResponse.json(data, { status: res.status });
}
