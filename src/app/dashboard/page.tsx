"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import DataGrid from "@/components/dashboard/DataGrid"
import { Zap, ShieldCheck, Activity, Globe } from "lucide-react"

const STATS = [
  { name: "Active Projects", value: "12", change: "+2", icon: Zap, color: "text-blue" },
  { name: "Global Health", value: "99.9%", change: "Stable", icon: ShieldCheck, color: "text-green-500" },
  { name: "Total Requests", value: "1.2M", change: "+12%", icon: Activity, color: "text-purple-500" },
  { name: "Global Nodes", value: "24", change: "Online", icon: Globe, color: "text-orange-500" },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-space-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-heading tracking-tight mb-space-2">Infrastructure Overview</h1>
          <p className="text-dashboard-text-tertiary text-sm max-w-2xl">
            Monitor your global infrastructure, project health, and API performance in real-time. 
            All systems are currently operational across all regions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="p-space-5 rounded-lg border border-dashboard-text-tertiary/10 bg-black/[0.01] flex flex-col gap-space-3 transition-all hover:border-blue/50 group">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 rounded-md bg-black/5", stat.color)}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-dashboard-text-tertiary bg-black/5 px-1.5 py-0.5 rounded uppercase tracking-wider group-hover:text-blue">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-heading">{stat.value}</div>
                  <div className="text-xs text-dashboard-text-tertiary mt-1">{stat.name}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Data Section */}
        <div className="flex flex-col gap-space-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-heading tracking-tight">Active Services</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold text-dashboard-text-tertiary bg-black/5 border border-dashboard-text-tertiary/20 rounded hover:bg-black/10 transition-colors">
                Filter
              </button>
              <button className="px-3 py-1.5 text-xs font-semibold text-white bg-blue rounded hover:bg-blue-hover transition-colors">
                New Service
              </button>
            </div>
          </div>
          <DataGrid />
        </div>
      </div>
    </DashboardLayout>
  )
}

// Utility function (inline for simplicity or import from lib)
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
