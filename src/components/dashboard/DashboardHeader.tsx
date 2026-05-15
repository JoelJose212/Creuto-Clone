"use client"

import { Search, User, ChevronRight } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-[64px] w-full items-center justify-between border-b border-dashboard-text-tertiary/20 bg-dashboard-bg/80 px-space-6 font-bricolage backdrop-blur-md">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-space-2 text-sm">
        <span className="text-dashboard-text-tertiary">Dashboard</span>
        <ChevronRight size={14} className="text-dashboard-text-tertiary" />
        <span className="font-semibold text-heading">Overview</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-space-6">
        {/* Search */}
        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-space-3">
            <Search size={14} className="text-dashboard-text-tertiary" />
          </div>
          <input
            type="text"
            className="w-full lg:w-[320px] rounded-md border border-dashboard-text-tertiary/20 bg-black/5 py-2 pl-10 pr-space-4 text-xs text-heading placeholder-dashboard-text-tertiary outline-none transition-all focus:border-blue focus:ring-1 focus:ring-blue"
            placeholder="Search documentation, logs, or teams..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-space-3">
            <kbd className="rounded border border-dashboard-text-tertiary/30 bg-white/5 px-1.5 py-0.5 text-[10px] font-sans text-dashboard-text-tertiary">⌘K</kbd>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-space-3">
          <div className="hidden text-right md:block">
            <div className="text-xs font-semibold text-heading">Admin User</div>
            <div className="text-[10px] text-dashboard-text-tertiary">enterprise-plan</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashboard-text-tertiary/30 bg-black/5 text-dashboard-text-tertiary">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  )
}
