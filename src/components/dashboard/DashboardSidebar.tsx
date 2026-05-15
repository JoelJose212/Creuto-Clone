"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Cloud, 
  Database,
  Code2,
  Bell
} from "lucide-react"
import { cn } from "@/lib/cn"

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Infrastructure", href: "/dashboard/infrastructure", icon: Cloud },
  { name: "Database", href: "/dashboard/database", icon: Database },
  { name: "API Reference", href: "/dashboard/api", icon: Code2 },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[240px] border-r border-dashboard-text-tertiary/20 bg-dashboard-bg p-space-6 font-bricolage transition-transform sm:translate-x-0">
      <div className="flex h-full flex-col">
        {/* Brand */}
        <Link href="/" className="mb-space-8 flex items-center px-space-2 text-[20px] font-bold tracking-tight">
          <span className="text-white">Creu</span>
          <span className="text-blue">to</span>
          <span className="ml-2 rounded bg-blue/10 px-1.5 py-0.5 text-[10px] font-medium text-blue">DASH</span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-space-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-space-3 rounded-md px-space-3 py-space-3 text-sm font-medium transition-all duration-motion-fast focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dashboard-bg",
                  isActive 
                    ? "bg-blue/10 text-white" 
                    : "text-dashboard-text-tertiary hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={18} className={cn("transition-colors", isActive ? "text-blue" : "group-hover:text-white")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Notifications & User Mini */}
        <div className="mt-auto border-t border-dashboard-text-tertiary/10 pt-space-6">
          <button className="group flex w-full items-center gap-space-3 rounded-md px-space-3 py-space-3 text-sm font-medium text-dashboard-text-tertiary hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-blue">
            <Bell size={18} className="group-hover:text-white" />
            Notifications
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue text-[10px] text-white">3</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
