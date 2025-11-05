"use client"

import { ServerCard } from "@/components/server-card"
import { useEffect, useState } from "react"

const mockServers = [
  {
    id: "1",
    name: "rpi4",
    status: "online" as const,
    cpu: 45,
    ram: 62,
    disk: 78,
    containers: [
      { name: "nginx", status: "running" as const },
      { name: "postgres", status: "running" as const },
      { name: "redis", status: "running" as const },
    ],
  },
  {
    id: "2",
    name: "vps-prod-01",
    status: "online" as const,
    cpu: 23,
    ram: 41,
    disk: 55,
    containers: [
      { name: "api-server", status: "running" as const },
      { name: "worker", status: "running" as const },
    ],
  },
  {
    id: "3",
    name: "homelab-nas",
    status: "offline" as const,
    cpu: 0,
    ram: 0,
    disk: 0,
    containers: [],
  },
  {
    id: "4",
    name: "k3s-master",
    status: "online" as const,
    cpu: 67,
    ram: 84,
    disk: 45,
    containers: [
      { name: "traefik", status: "running" as const },
      { name: "cert-manager", status: "running" as const },
      { name: "monitoring", status: "running" as const },
      { name: "grafana", status: "running" as const },
    ],
  },
]

export function DashboardView() {
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      setTimeout(() => setIsUpdating(false), 1000)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Monitor your self-hosted infrastructure</p>
        </div>
        {isUpdating && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span>Updating...</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {mockServers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  )
}
