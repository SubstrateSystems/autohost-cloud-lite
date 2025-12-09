"use client"

import { Header, Sidebar } from "@/components/layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        <footer className="border-t border-border px-6 py-3 text-center text-xs text-muted-foreground">
          © AutoHost Cloud Lite 2025
        </footer>
      </div>
    </div>
  )
}
