// "use client"

// import { useParams, useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Button } from "@/components/ui/button"
// import {
//   Cpu,
//   HardDrive,
//   MemoryStick,
//   ArrowLeft,
//   Activity,
//   AlertTriangle,
//   AlertCircle,
//   Info,
//   Server,
//   Network,
//   Clock,
// } from "lucide-react"
// import { Header } from "@/components/layout/Header"
// import { Sidebar } from "@/components/layout/Sidebar"
// import { useEffect, useState } from "react"

// // Mock data - in production this would come from an API
// const mockServers = {
//   "1": {
//     id: "1",
//     name: "rpi4",
//     status: "online" as const,
//     cpu: 45,
//     ram: 62,
//     disk: 78,
//     ip: "192.168.1.100",
//     uptime: "15 days, 7 hours",
//     os: "Ubuntu 22.04 LTS",
//     containers: [
//       { name: "nginx", status: "running" as const, cpu: 5, ram: 128 },
//       { name: "postgres", status: "running" as const, cpu: 12, ram: 512 },
//       { name: "redis", status: "running" as const, cpu: 3, ram: 64 },
//     ],
//     alerts: [
//       {
//         id: "1",
//         type: "warning" as const,
//         title: "High RAM Usage",
//         message: "RAM usage at 92%",
//         timestamp: "1 hour ago",
//       },
//       {
//         id: "2",
//         type: "warning" as const,
//         title: "Disk Space Low",
//         message: "Disk usage at 78%",
//         timestamp: "5 hours ago",
//       },
//       {
//         id: "3",
//         type: "info" as const,
//         title: "Container Restarted",
//         message: "nginx container restarted successfully",
//         timestamp: "3 hours ago",
//       },
//     ],
//   },
//   "2": {
//     id: "2",
//     name: "vps-prod-01",
//     status: "online" as const,
//     cpu: 23,
//     ram: 41,
//     disk: 55,
//     ip: "45.123.67.89",
//     uptime: "42 days, 3 hours",
//     os: "Debian 12",
//     containers: [
//       { name: "api-server", status: "running" as const, cpu: 15, ram: 1024 },
//       { name: "worker", status: "running" as const, cpu: 8, ram: 512 },
//     ],
//     alerts: [
//       {
//         id: "1",
//         type: "info" as const,
//         title: "System Update Available",
//         message: "Security updates available for installation",
//         timestamp: "2 days ago",
//       },
//     ],
//   },
//   "3": {
//     id: "3",
//     name: "homelab-nas",
//     status: "offline" as const,
//     cpu: 0,
//     ram: 0,
//     disk: 0,
//     ip: "192.168.1.150",
//     uptime: "Offline",
//     os: "TrueNAS Scale",
//     containers: [],
//     alerts: [
//       {
//         id: "1",
//         type: "critical" as const,
//         title: "Node Offline",
//         message: "Node has been offline for 2 hours",
//         timestamp: "2 hours ago",
//       },
//     ],
//   },
//   "4": {
//     id: "4",
//     name: "k3s-master",
//     status: "online" as const,
//     cpu: 67,
//     ram: 84,
//     disk: 45,
//     ip: "192.168.1.200",
//     uptime: "8 days, 12 hours",
//     os: "Ubuntu 22.04 LTS",
//     containers: [
//       { name: "traefik", status: "running" as const, cpu: 8, ram: 256 },
//       { name: "cert-manager", status: "running" as const, cpu: 5, ram: 128 },
//       { name: "monitoring", status: "running" as const, cpu: 20, ram: 1024 },
//       { name: "grafana", status: "running" as const, cpu: 10, ram: 512 },
//     ],
//     alerts: [
//       {
//         id: "1",
//         type: "warning" as const,
//         title: "High CPU Usage",
//         message: "CPU usage at 85% for 15 minutes",
//         timestamp: "15 min ago",
//       },
//       {
//         id: "2",
//         type: "warning" as const,
//         title: "High RAM Usage",
//         message: "RAM usage at 84%",
//         timestamp: "30 min ago",
//       },
//     ],
//   },
// }

// export default function NodeDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const [isUpdating, setIsUpdating] = useState(false)

//   const nodeId = params.id as string
//   const node = mockServers[nodeId as keyof typeof mockServers]

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsUpdating(true)
//       setTimeout(() => setIsUpdating(false), 1000)
//     }, 10000)

//     return () => clearInterval(interval)
//   }, [])

//   if (!node) {
//     return (
//       <div className="flex min-h-screen flex-col bg-background">
//         <Header />
//         <div className="flex flex-1">
//           <Sidebar activeView="nodes" onViewChange={() => {}} />
//           <main className="flex-1 overflow-y-auto p-8">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold text-foreground">Node not found</h2>
//               <Button onClick={() => router.push("/")} className="mt-4">
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Dashboard
//               </Button>
//             </div>
//           </main>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-background">
//       <Header />
//       <div className="flex flex-1">
//         <Sidebar activeView="nodes" onViewChange={() => {}} />
//         <main className="flex-1 overflow-y-auto p-8">
//           <div className="mx-auto max-w-7xl space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//                 <div>
//                   <div className="flex items-center gap-3">
//                     <h1 className="text-3xl font-bold text-foreground">{node.name}</h1>
//                     <Badge
//                       variant={node.status === "online" ? "default" : "destructive"}
//                       className={node.status === "online" ? "bg-success text-black" : ""}
//                     >
//                       {node.status === "online" ? "🟢" : "🔴"} {node.status}
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">Detailed node metrics and monitoring</p>
//                 </div>
//               </div>
//               {isUpdating && (
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
//                   <span>Updating...</span>
//                 </div>
//               )}
//             </div>

//             {/* Node Info Cards */}
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
//                     <Server className="h-4 w-4" />
//                     Operating System
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-xl font-bold text-foreground">{node.os}</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
//                     <Network className="h-4 w-4" />
//                     IP Address
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="font-mono text-xl font-bold text-foreground">{node.ip}</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
//                     <Clock className="h-4 w-4" />
//                     Uptime
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-xl font-bold text-foreground">{node.uptime}</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
//                     <Activity className="h-4 w-4" />
//                     Containers
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-xl font-bold text-foreground">{node.containers.length}</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Metrics */}
//             <div className="grid gap-6 lg:grid-cols-3">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Cpu className="h-5 w-5 text-primary" />
//                     CPU Usage
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="text-center">
//                     <p className="text-5xl font-bold text-foreground">{node.cpu}%</p>
//                     <p className="text-sm text-muted-foreground">Current usage</p>
//                   </div>
//                   <Progress value={node.cpu} className="h-3" />
//                   <div className="flex justify-between text-xs text-muted-foreground">
//                     <span>0%</span>
//                     <span>50%</span>
//                     <span>100%</span>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <MemoryStick className="h-5 w-5 text-primary" />
//                     RAM Usage
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="text-center">
//                     <p className="text-5xl font-bold text-foreground">{node.ram}%</p>
//                     <p className="text-sm text-muted-foreground">Current usage</p>
//                   </div>
//                   <Progress value={node.ram} className="h-3" />
//                   <div className="flex justify-between text-xs text-muted-foreground">
//                     <span>0%</span>
//                     <span>50%</span>
//                     <span>100%</span>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <HardDrive className="h-5 w-5 text-primary" />
//                     Disk Usage
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="text-center">
//                     <p className="text-5xl font-bold text-foreground">{node.disk}%</p>
//                     <p className="text-sm text-muted-foreground">Current usage</p>
//                   </div>
//                   <Progress value={node.disk} className="h-3" />
//                   <div className="flex justify-between text-xs text-muted-foreground">
//                     <span>0%</span>
//                     <span>50%</span>
//                     <span>100%</span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Containers */}
//             {node.containers.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Containers</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {node.containers.map((container) => (
//                       <div
//                         key={container.name}
//                         className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="rounded-lg bg-primary/10 p-3">
//                             <Activity className="h-5 w-5 text-primary" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-foreground">{container.name}</p>
//                             <p className="text-sm text-muted-foreground">
//                               CPU: {container.cpu}% • RAM: {container.ram}MB
//                             </p>
//                           </div>
//                         </div>
//                         <Badge variant="outline" className="border-success/50 text-success">
//                           {container.status}
//                         </Badge>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Alerts */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Node Alerts</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {node.alerts.length === 0 ? (
//                   <div className="py-8 text-center text-muted-foreground">
//                     <Info className="mx-auto mb-2 h-8 w-8" />
//                     <p>No alerts for this node</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     {node.alerts.map((alert) => (
//                       <div
//                         key={alert.id}
//                         className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
//                       >
//                         <div className="mt-0.5">
//                           {alert.type === "critical" && (
//                             <div className="rounded-full bg-destructive/10 p-2">
//                               <AlertCircle className="h-5 w-5 text-destructive" />
//                             </div>
//                           )}
//                           {alert.type === "warning" && (
//                             <div className="rounded-full bg-warning/10 p-2">
//                               <AlertTriangle className="h-5 w-5 text-warning" />
//                             </div>
//                           )}
//                           {alert.type === "info" && (
//                             <div className="rounded-full bg-primary/10 p-2">
//                               <Info className="h-5 w-5 text-primary" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-1 space-y-1">
//                           <div className="flex items-center justify-between">
//                             <h4 className="font-semibold text-foreground">{alert.title}</h4>
//                             <Badge
//                               variant={
//                                 alert.type === "critical"
//                                   ? "destructive"
//                                   : alert.type === "warning"
//                                     ? "default"
//                                     : "secondary"
//                               }
//                               className={alert.type === "warning" ? "bg-warning text-black" : ""}
//                             >
//                               {alert.type}
//                             </Badge>
//                           </div>
//                           <p className="text-sm text-muted-foreground">{alert.message}</p>
//                           <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
export default function NodeDetailPage() {
  return <div>Node Detail Page - Under Construction</div>
}