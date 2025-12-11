"use client";

import { useState, useEffect, useCallback } from "react";
import type { Node } from "@/lib/types";
import { fetchWithAuth } from "@/lib/api/fetch-client";

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

      const res = await fetchWithAuth("/api/nodes/with-metrics");

      if (!res.ok) {
        throw new Error("Failed to fetch nodes");
      }

      // Los nodos ya vienen mapeados y con el estado calculado desde el servidor
      const nodes: Node[] = await res.json();

      setNodes(nodes);
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
