import { NextResponse } from "next/server";
import { getNodesBackend } from "@/lib/api/nodes";
import { getAccessTokenFromCookie } from "@/lib/cookies";

export async function GET() {
  const accessToken = await getAccessTokenFromCookie();

  console.log("[NODES] Access token from cookie:", accessToken ? accessToken.substring(0, 20) + "..." : "null");

  if (!accessToken) {
    console.log("[NODES] No access token, returning 401");
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = await getNodesBackend(accessToken);
  const data = await res.json().catch(() => ({}));

  return NextResponse.json(data, { status: res.status });
}
