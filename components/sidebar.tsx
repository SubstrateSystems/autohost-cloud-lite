"use client"

import { LayoutDashboard, Server, AlertTriangle, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeView: "dashboard" | "nodes" | "alerts" | "settings"
  onViewChange: (view: "dashboard" | "nodes" | "alerts" | "settings") => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "nodes" as const, label: "Nodes", icon: Server },
    { id: "alerts" as const, label: "Alerts", icon: AlertTriangle },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ]

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-sidebar">
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeView === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
