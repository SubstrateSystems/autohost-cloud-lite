"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockNodes = [
  {
    hostname: "rpi4",
    ip: "192.168.1.100",
    os: "Ubuntu 22.04",
    uptime: "45d 12h",
    lastSeen: "2 min ago",
    status: "online" as const,
  },
  {
    hostname: "vps-prod-01",
    ip: "45.123.67.89",
    os: "Debian 12",
    uptime: "120d 5h",
    lastSeen: "1 min ago",
    status: "online" as const,
  },
  {
    hostname: "homelab-nas",
    ip: "192.168.1.150",
    os: "TrueNAS Scale",
    uptime: "0d 0h",
    lastSeen: "2h ago",
    status: "offline" as const,
  },
  {
    hostname: "k3s-master",
    ip: "10.0.0.10",
    os: "Ubuntu 24.04",
    uptime: "30d 8h",
    lastSeen: "30 sec ago",
    status: "online" as const,
  },
]

export function NodesView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Nodes</h2>
        <p className="text-sm text-muted-foreground">Manage your server infrastructure</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Nodes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hostname</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Operating System</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNodes.map((node) => (
                <TableRow key={node.hostname}>
                  <TableCell className="font-medium">{node.hostname}</TableCell>
                  <TableCell className="font-mono text-sm">{node.ip}</TableCell>
                  <TableCell>{node.os}</TableCell>
                  <TableCell>{node.uptime}</TableCell>
                  <TableCell className="text-muted-foreground">{node.lastSeen}</TableCell>
                  <TableCell>
                    <Badge
                      variant={node.status === "online" ? "default" : "destructive"}
                      className={node.status === "online" ? "bg-success text-black" : ""}
                    >
                      {node.status === "online" ? "🟢" : "🔴"} {node.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
