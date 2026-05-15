"use client"

import DashboardSidebar from "./DashboardSidebar"
import DashboardHeader from "./DashboardHeader"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <DashboardSidebar />
      <div className="flex flex-col sm:ml-[240px]">
        <DashboardHeader />
        <main className="flex-1 p-space-6 font-bricolage">
          {children}
        </main>
      </div>
    </div>
  )
}
