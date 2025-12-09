import { API_ENDPOINTS } from "@/config/constants";
import type { NodeBackendResponse } from "@/lib/types";
import { backendFetch } from "../api";
import { calculateNodeStatus } from "../utils/node-status";

/**
 * Obtiene la lista de nodos del backend
 */
export async function getNodesBackend(accessToken: string) {
  return backendFetch(API_ENDPOINTS.NODES.LIST, {
    method: "GET",
  }, accessToken);
}

/**
 * Obtiene un nodo específico del backend
 */
export async function getNodeBackend(id: string, accessToken: string) {
  return backendFetch(API_ENDPOINTS.NODES.DETAIL(id), {
    method: "GET",
  }, accessToken);
}

/**
 * Mapea un nodo del backend al formato de la UI
 */
export function mapNodeFromBackend(node: NodeBackendResponse) {
  return {
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
  };
}
