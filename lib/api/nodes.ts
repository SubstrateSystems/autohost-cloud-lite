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
 * Obtiene la lista de nodos con métricas del backend
 */
export async function getNodesWithMetricsBackend(accessToken: string) {
  return backendFetch(API_ENDPOINTS.NODES.WITH_METRICS, {
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

/**
 * Mapea un nodo con métricas del backend (snake_case) al formato de la UI
 */
export function mapNodeWithMetricsFromBackend(node: import("@/lib/types").NodeWithMetricsBackendResponse) {
  return {
    id: node.id,
    name: node.hostname,
    status: calculateNodeStatus(node.last_seen_at),
    cpu: node.last_metric?.cpu_usage_percent || 0,
    ram: node.last_metric?.memory_usage_percent || 0,
    disk: node.last_metric?.disk_usage_percent || 0,
    containers: [],
    ipLocal: node.ip_local,
    os: node.os,
    arch: node.arch,
    versionAgent: node.version_agent,
    lastSeenAt: node.last_seen_at,
    createdAt: node.created_at,
    updatedAt: node.updated_at,
  };
}
