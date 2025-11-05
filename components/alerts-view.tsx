"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"

const mockAlerts = [
  {
    id: "1",
    type: "critical" as const,
    title: "Node Offline",
    message: "homelab-nas has been offline for 2 hours",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "warning" as const,
    title: "High CPU Usage",
    message: "k3s-master CPU usage at 85% for 15 minutes",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    type: "warning" as const,
    title: "High RAM Usage",
    message: "rpi4 RAM usage at 92%",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "info" as const,
    title: "Container Restarted",
    message: "nginx container on rpi4 restarted successfully",
    timestamp: "3 hours ago",
  },
  {
    id: "5",
    type: "warning" as const,
    title: "Disk Space Low",
    message: "rpi4 disk usage at 78%",
    timestamp: "5 hours ago",
  },
]

export function AlertsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Alerts</h2>
        <p className="text-sm text-muted-foreground">Recent system alerts and notifications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="mt-0.5">
                  {alert.type === "critical" && (
                    <div className="rounded-full bg-destructive/10 p-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                  )}
                  {alert.type === "warning" && (
                    <div className="rounded-full bg-warning/10 p-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    </div>
                  )}
                  {alert.type === "info" && (
                    <div className="rounded-full bg-primary/10 p-2">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{alert.title}</h4>
                    <Badge
                      variant={
                        alert.type === "critical" ? "destructive" : alert.type === "warning" ? "default" : "secondary"
                      }
                      className={alert.type === "warning" ? "bg-warning text-black" : ""}
                    >
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
