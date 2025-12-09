export type NodeStatus = "online" | "offline";

export type ContainerStatus = "running" | "stopped";

export interface Container {
  name: string;
  status: ContainerStatus;
}

export interface Node {
  id: string;
  name: string;
  status: NodeStatus;
  cpu: number;
  ram: number;
  disk: number;
  containers: Container[];
  ipLocal?: string;
  os?: string;
  arch?: string;
  versionAgent?: string;
  lastSeenAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tipo de respuesta del backend
export interface NodeBackendResponse {
  ID: string;
  Hostname: string;
  IPLocal: string;
  OS: string;
  Arch: string;
  VersionAgent: string;
  OwnerID: string;
  LastSeenAt: string;
  CreatedAt: string;
  UpdatedAt: string;
}
