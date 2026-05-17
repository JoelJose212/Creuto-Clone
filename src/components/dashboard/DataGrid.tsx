"use client"

import { cn } from "@/lib/cn"
import { MoreHorizontal, ExternalLink, Server } from "lucide-react"

const DATA = [
  { id: "PRJ-001", name: "Creuto-AI-Core", type: "Production", status: "Active", latency: "24ms", health: "100%" },
  { id: "PRJ-002", name: "Mobile-API-v2", type: "Staging", status: "Active", latency: "18ms", health: "100%" },
  { id: "PRJ-003", name: "Web-Frontend-Main", type: "Production", status: "Deploying", latency: "N/A", health: "98%" },
  { id: "PRJ-004", name: "Internal-Tool-v1", type: "Development", status: "Paused", latency: "N/A", health: "N/A" },
  { id: "PRJ-005", name: "Auth-Service-Gateway", type: "Production", status: "Active", latency: "12ms", health: "100%" },
]

export default function DataGrid() {
  return (
    <div className="overflow-x-auto rounded-lg border border-dashboard-text-tertiary/10 bg-black/[0.01]">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-dashboard-bg/95 backdrop-blur-sm border-b border-dashboard-text-tertiary/20">
          <tr className="text-[11px] font-bold uppercase tracking-wider text-dashboard-text-tertiary">
            <th className="px-space-4 py-space-3 font-semibold">Service ID</th>
            <th className="px-space-4 py-space-3 font-semibold">Project Name</th>
            <th className="px-space-4 py-space-3 font-semibold">Environment</th>
            <th className="px-space-4 py-space-3 font-semibold">Status</th>
            <th className="px-space-4 py-space-3 font-semibold">Latency</th>
            <th className="px-space-4 py-space-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dashboard-text-tertiary/10">
          {DATA.map((row) => (
            <tr 
              key={row.id} 
              className="group text-[13px] text-heading transition-colors hover:bg-black/[0.02] active:bg-black/[0.03]"
            >
              <td className="px-space-4 py-space-4 font-mono text-[12px] text-dashboard-text-tertiary">{row.id}</td>
              <td className="px-space-4 py-space-4">
                <div className="flex items-center gap-2">
                  <Server size={14} className="text-blue" />
                  <span className="font-semibold">{row.name}</span>
                </div>
              </td>
              <td className="px-space-4 py-space-4">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border",
                  row.type === "Production" ? "border-green-500/20 text-green-400 bg-green-500/5" : "border-dashboard-text-tertiary/20 text-dashboard-text-tertiary"
                )}>
                  {row.type}
                </span>
              </td>
              <td className="px-space-4 py-space-4">
                <div className="flex items-center gap-1.5">
                  <div className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    row.status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : 
                    row.status === "Deploying" ? "bg-blue animate-pulse" : "bg-dashboard-text-tertiary"
                  )} />
                  <span className="text-xs">{row.status}</span>
                </div>
              </td>
              <td className="px-space-4 py-space-4 text-dashboard-text-tertiary">{row.latency}</td>
              <td className="px-space-4 py-space-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="flex h-7 w-7 items-center justify-center rounded border border-dashboard-text-tertiary/20 text-dashboard-text-tertiary transition-all hover:border-blue hover:text-heading focus-visible:ring-2 focus-visible:ring-blue">
                    <ExternalLink size={14} />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded border border-dashboard-text-tertiary/20 text-dashboard-text-tertiary transition-all hover:border-blue hover:text-heading focus-visible:ring-2 focus-visible:ring-blue">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
