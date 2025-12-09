"use client";

import { useState, useEffect, useCallback } from "react";
import type { Node, NodeBackendResponse } from "@/lib/types";
import { fetchWithAuth } from "@/lib/api/fetch-client";
import { calculateNodeStatus } from "@/lib/utils/node-status";

/**
 * Hook para obtener y gestionar la lista de nodos
 */
export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNodes = useCallback(async (showUpdating = false) => {
    try {
      if (showUpdating) setIsUpdating(true);

      const res = await fetchWithAuth("/api/nodes");

      if (!res.ok) {
        throw new Error("Failed to fetch nodes");
      }

      const data: NodeBackendResponse[] = await res.json();

      // Mapear los datos del backend al formato de la UI
      const mappedNodes: Node[] = data.map((node) => ({
        id: node.ID,
        name: node.Hostname,
        status: calculateNodeStatus(node.LastSeenAt),
        cpu: 0,
        ram: 0,
        disk: 0,
        containers: [],
        ipLocal: node.IPLocal,
        os: node.OS,
        arch: node.Arch,
        versionAgent: node.VersionAgent,
        lastSeenAt: node.LastSeenAt,
        createdAt: node.CreatedAt,
        updatedAt: node.UpdatedAt,
      }));

      setNodes(mappedNodes);
      setError(null);
    } catch (err) {
      console.error("Error fetching nodes:", err);
      setError("Failed to load servers");
    } finally {
      setIsLoading(false);
      if (showUpdating) setIsUpdating(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchNodes(true);
  }, [fetchNodes]);

  useEffect(() => {
    fetchNodes();

    // Auto-refresh cada 10 segundos
    const interval = setInterval(() => {
      fetchNodes(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchNodes]);

  return {
    nodes,
    isLoading,
    isUpdating,
    error,
    refresh,
  };
}
