import { NextResponse } from "next/server";
import { getNodesWithMetricsBackend, mapNodeWithMetricsFromBackend } from "@/lib/api/nodes";
import { getAccessTokenFromCookie } from "@/lib/cookies";
import type { NodeWithMetricsBackendResponse } from "@/lib/types";

export async function GET() {
  const accessToken = await getAccessTokenFromCookie();

  console.log("[NODES WITH METRICS] Access token from cookie:", accessToken ? accessToken.substring(0, 20) + "..." : "null");

  if (!accessToken) {
    console.log("[NODES WITH METRICS] No access token, returning 401");
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const res = await getNodesWithMetricsBackend(accessToken);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
      console.error("[NODES WITH METRICS] Backend error:", res.status, errorData);
      return NextResponse.json(errorData, { status: res.status });
    }

    const backendNodes: NodeWithMetricsBackendResponse[] = await res.json();
    console.log("[NODES WITH METRICS] Success, received", backendNodes.length, "nodes");
    
    // Mapear nodos y calcular estado basado en last_seen_at
    const mappedNodes = backendNodes.map((node) => {
      const mappedNode = mapNodeWithMetricsFromBackend(node);
      console.log(`[NODES WITH METRICS] Node "${node.hostname}": LastSeenAt=${node.last_seen_at}, Status=${mappedNode.status}`);
      return mappedNode;
    });
    
    return NextResponse.json(mappedNodes, { status: 200 });
  } catch (error) {
    console.error("[NODES WITH METRICS] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
