"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { DashboardView } from "@/components/dashboard-view"
import { NodesView } from "@/components/nodes-view"
import { AlertsView } from "@/components/alerts-view"
import { SettingsView } from "@/components/settings-view"

export default function Home() {
  const [activeView, setActiveView] = useState<"dashboard" | "nodes" | "alerts" | "settings">("dashboard")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {activeView === "dashboard" && <DashboardView />}
          {activeView === "nodes" && <NodesView />}
          {activeView === "alerts" && <AlertsView />}
          {activeView === "settings" && <SettingsView />}
        </main>
        <footer className="border-t border-border px-6 py-3 text-center text-xs text-muted-foreground">
          © AutoHost Cloud Lite 2025
        </footer>
      </div>
    </div>
  )
}
