"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  Briefcase, 
  Mail, 
  Phone, 
  Bell, 
  LogOut, 
  Clock, 
  Settings, 
  Menu, 
  X, 
  User,
  ChevronDown,
  Megaphone,
  Loader2,
  Calendar,
  AlertCircle
} from "lucide-react"

// Navigation items
const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Contact Us", href: "/admin/contact", icon: Mail },
  { name: "Booked Calls", href: "/admin/bookings", icon: Phone },
  { name: "Bulletins", href: "/admin/bulletins", icon: Megaphone },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [systemTime, setSystemTime] = useState("")
  const [stats, setStats] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const isLoginPage = pathname === "/admin/login"

  // 1. Session Authorization Check
  useEffect(() => {
    if (isLoginPage) {
      setIsAuthorized(true)
      return
    }

    const checkAuth = () => {
      const cookies = document.cookie.split("; ")
      const sessionCookie = cookies.find(row => row.startsWith("creuto_admin_session="))
      
      if (sessionCookie && sessionCookie.split("=")[1] === "authorized") {
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
        router.push("/admin/login")
      }
    }

    checkAuth()
    // Periodic check
    const interval = setInterval(checkAuth, 5000)
    return () => clearInterval(interval)
  }, [pathname, isLoginPage, router])

  // 2. Fetch Notification Data from Stats API
  useEffect(() => {
    if (isLoginPage || !isAuthorized) return

    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/admin/stats")
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            setStats(data.stats)
            setNotifications(data.recentActivity || [])
            setUnreadCount(data.recentActivity?.length || 0)
          }
        }
      } catch (err) {
        console.error("Error fetching admin stats in layout:", err)
      }
    }

    fetchNotifications()
    const interval = setInterval(fetchNotifications, 15000) // Poll every 15s
    return () => clearInterval(interval)
  }, [isLoginPage, isAuthorized])

  // 3. System Clock ticking
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setSystemTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Close dropdowns on route changes
  useEffect(() => {
    setSidebarOpen(false)
    setProfileDropdownOpen(false)
    setNotificationsOpen(false)
  }, [pathname])

  const handleLogout = () => {
    document.cookie = "creuto_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    router.push("/admin/login")
  }

  // Loading Screen for auth validation
  if (isAuthorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7ff] text-slate-800 font-jakarta relative overflow-hidden">
        {/* BACKGROUND DECORATION */}
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600/10 opacity-30 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-sky-500/10 opacity-40 blur-[130px] pointer-events-none" />
        
        <div className="text-center space-y-4 relative z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 border border-blue-500/20 mx-auto shadow-md">
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="font-bricolage text-lg font-extrabold text-slate-900">Creuto Control Deck</p>
            <p className="text-xs text-slate-500 font-semibold tracking-wide">Verifying secure administrative session...</p>
          </div>
        </div>
      </div>
    )
  }

  // If unauthorized and we're redirecting, render blank screen
  if (!isAuthorized) {
    return null
  }

  // Login page bypasses the admin shell
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-[#f4f7ff] text-slate-800 overflow-hidden font-jakarta admin-theme">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600/10 opacity-30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-sky-500/10 opacity-40 blur-[130px] pointer-events-none" />

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/80 bg-white/95 backdrop-blur-xl transition-all duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Logo Header */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-200/80">
          <Link href="/admin" className="flex items-center gap-2.5 font-bricolage text-xl font-bold tracking-tight text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white shadow-md shadow-blue-600/20">
              C
            </span>
            <span>Creuto Admin</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-0.5" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-500 hover:bg-blue-50/70 hover:text-blue-600"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-6 rounded-r bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-105 duration-200 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer Account Details */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50">
          <div className="flex items-center gap-3 rounded-xl bg-white p-3 border border-slate-200/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Admin Controller</p>
              <p className="text-sm font-bold text-slate-800 truncate">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* FLOATING TOP NAVIGATION BAR */}
        <header className="flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/70 backdrop-blur-md px-6 z-30">
          
          {/* Left panel buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-500 hover:text-slate-800 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden items-center gap-2 rounded-xl bg-slate-100/80 px-3.5 py-1.5 border border-slate-200 text-slate-600 md:flex">
              <Clock className="h-4 w-4 text-blue-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-700 select-none">
                SYS: {systemTime || "Connecting..."}
              </span>
            </div>
          </div>

          {/* Right panel notification dropdown & profile trigger */}
          <div className="flex items-center gap-4">
            
            {/* 1. NOTIFICATIONS CENTER DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 transition-all ${
                  notificationsOpen 
                    ? "bg-blue-600/10 border-blue-500/30 text-blue-600" 
                    : "bg-white text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-4 ring-white animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    {/* Click outside overlay */}
                    <div className="fixed inset-0 z-30" onClick={() => setNotificationsOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl backdrop-blur-xl z-40"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                          <span>Live Activity Feed</span>
                          <span className="rounded-full bg-blue-600/15 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                            Recent
                          </span>
                        </h4>
                        {unreadCount > 0 && (
                          <button 
                            onClick={() => setUnreadCount(0)}
                            className="text-xs text-blue-600 hover:text-blue-500 font-semibold"
                          >
                            Mark read
                          </button>
                        )}
                      </div>

                      <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                        {notifications.length === 0 ? (
                          <div className="py-6 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                            <AlertCircle className="h-6 w-6 text-slate-400" />
                            <span>No recent lead notifications.</span>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id}
                              className="flex items-start gap-3 rounded-xl bg-slate-50/50 p-2.5 hover:bg-slate-100/50 transition-all border border-slate-100"
                            >
                              <div className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg border text-[10px] font-bold ${
                                notif.type === "Careers" 
                                  ? "bg-amber-500/10 border-amber-500/20 text-amber-600" 
                                  : notif.type === "Contact"
                                  ? "bg-purple-500/10 border-purple-500/20 text-purple-600"
                                  : "bg-blue-500/10 border-blue-500/20 text-blue-600"
                              }`}>
                                {notif.type[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">{notif.name}</p>
                                <p className="text-[11px] text-slate-600 truncate">{notif.title}</p>
                                <p className="text-[9px] text-slate-400 mt-0.5">
                                  {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* 2. PROFILE ACCOUNT DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 hover:bg-slate-50 hover:border-slate-300 transition-all text-left"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                  A
                </div>
                <div className="hidden flex-col md:flex">
                  <span className="text-xs font-bold leading-tight text-slate-800">Administrator</span>
                </div>
                <ChevronDown className="h-4.5 w-4.5 text-slate-500 hidden md:block" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setProfileDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xl z-40"
                    >
                      <div className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1.5">
                        Controls
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
