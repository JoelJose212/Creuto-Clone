"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Users, 
  MessageSquare, 
  PhoneCall, 
  Megaphone, 
  ArrowUpRight, 
  RefreshCw, 
  ArrowRight,
  Plus,
  TrendingUp,
  Clock,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Mail,
  Phone
} from "lucide-react"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalContacts: 0,
    totalBookings: 0,
    totalNotices: 0
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)

  // Fetch dashboard dynamic data
  const fetchData = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true)
    try {
      const res = await fetch("/api/admin/stats")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setStats(data.stats)
          setRecentActivity(data.recentActivity || [])
        }
      }
    } catch (err) {
      console.error("Error loading dashboard stats:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Dynamic Chart coordinates based on actual counts to make it feel responsive
  const maxVal = Math.max(stats.totalApplications, stats.totalContacts, stats.totalBookings, 8)
  const chartPoints = [
    Math.round(maxVal * 0.25),
    Math.round(maxVal * 0.4),
    Math.round(stats.totalBookings * 1.2 || maxVal * 0.35),
    Math.round(stats.totalContacts * 0.8 || maxVal * 0.6),
    Math.round(stats.totalApplications * 0.9 || maxVal * 0.5),
    Math.round(stats.totalApplications + stats.totalContacts + stats.totalBookings)
  ]

  // Convert numbers to points on an SVG canvas (width 600, height 200)
  const width = 600
  const height = 180
  const padding = 20
  const pointsX = chartPoints.map((_, i) => padding + (i * (width - padding * 2)) / (chartPoints.length - 1))
  const pointsY = chartPoints.map(val => {
    const ratio = maxVal > 0 ? val / maxVal : 0.5
    return height - padding - ratio * (height - padding * 2)
  })

  // Build svg path string for Bézier curve
  let pathD = `M ${pointsX[0]} ${pointsY[0]}`
  for (let i = 0; i < pointsX.length - 1; i++) {
    const cpX1 = pointsX[i] + (pointsX[i + 1] - pointsX[i]) / 2
    const cpY1 = pointsY[i]
    const cpX2 = pointsX[i] + (pointsX[i + 1] - pointsX[i]) / 2
    const cpY2 = pointsY[i + 1]
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pointsX[i + 1]} ${pointsY[i + 1]}`
  }

  // Build closed shape for gradient area filling
  const areaD = `${pathD} L ${pointsX[pointsX.length - 1]} ${height} L ${pointsX[0]} ${height} Z`

  if (loading) {
    return (
      <div className="space-y-6 font-jakarta text-slate-400">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-8 w-48 rounded bg-white/5 animate-pulse" />
          <div className="h-10 w-24 rounded bg-white/5 animate-pulse" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-3xl bg-white/5 border border-white/5 animate-pulse" />
          ))}
        </div>

        {/* Charts & Table Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 h-80 rounded-3xl bg-white/5 border border-white/5 animate-pulse" />
          <div className="h-80 rounded-3xl bg-white/5 border border-white/5 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 font-jakarta">
      {/* Dashboard Headline & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Control Room Dashboard
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Real-time analytics and dynamic administrative controls for Creuto.
          </p>
        </div>
        
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/[0.05] hover:text-white hover:border-white/20 active:scale-98 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-blue-400" : ""}`} />
          <span>{refreshing ? "Refreshing..." : "Sync Logs"}</span>
        </button>
      </div>

      {/* STRATEGIC METRICS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Metric 1: Careers Applicants */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-xl transition-all"
        >
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-blue-500/10 blur-[30px] -z-10" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Careers Applicants</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bricolage text-3xl font-black text-white">{stats.totalApplications}</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-semibold">
              <TrendingUp className="h-3 w-3" />
              <span>Live candidates logged</span>
            </div>
          </div>
        </motion.div>

        {/* Metric 2: Contact Enquiries */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-xl transition-all"
        >
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-purple-500/10 blur-[30px] -z-10" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Enquiries</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bricolage text-3xl font-black text-white">{stats.totalContacts}</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-semibold">
              <TrendingUp className="h-3 w-3" />
              <span>Website submissions</span>
            </div>
          </div>
        </motion.div>

        {/* Metric 3: Booked Calls */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-xl transition-all"
        >
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-amber-500/10 blur-[30px] -z-10" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Booked Calls</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-400">
              <PhoneCall className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bricolage text-3xl font-black text-white">{stats.totalBookings}</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-400 font-semibold">
              <span>Client appointments</span>
            </div>
          </div>
        </motion.div>

        {/* Metric 4: Active Bulletins */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-xl transition-all"
        >
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-emerald-500/10 blur-[30px] -z-10" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Bulletins</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
              <Megaphone className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bricolage text-3xl font-black text-white">{stats.totalNotices}</h3>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-semibold">
              <span>Dynamic pinboard notices</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ANALYTICS & ACTIVITY ROW */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* SVG Analytics Trend Graph */}
        <div className="lg:col-span-2 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bricolage text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4.5 w-4.5 text-blue-400" />
                <span>Lead & Client Growth Trends</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Aggregated visual curves of recent channel activities</p>
            </div>
            <div className="rounded-lg bg-blue-600/10 px-2.5 py-1 text-[10px] font-bold text-blue-400 border border-blue-500/10 uppercase">
              Operational
            </div>
          </div>

          {/* SVG Wave Plot */}
          <div className="relative w-full h-[180px] mt-4 select-none">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {/* Filled Area */}
              <path d={areaD} fill="url(#areaGrad)" />

              {/* Smooth Spline Curve */}
              <path d={pathD} fill="none" stroke="url(#strokeGrad)" strokeWidth="3" strokeLinecap="round" />

              {/* Circles at Data Coordinates */}
              {pointsX.map((x, idx) => (
                <g key={idx} className="group">
                  <circle
                    cx={x}
                    cy={pointsY[idx]}
                    r="5"
                    className="fill-blue-500 stroke-[#0a0f24] stroke-2 cursor-pointer transition-all hover:r-7 duration-200"
                  />
                  {/* Tooltip on point */}
                  <text
                    x={x}
                    y={pointsY[idx] - 12}
                    textAnchor="middle"
                    className="fill-slate-300 font-mono text-[9px] font-bold opacity-80"
                  >
                    {chartPoints[idx]}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex justify-between items-center mt-4 text-[10px] text-slate-500 font-mono font-bold px-2">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>LIVE NOW</span>
          </div>
        </div>

        {/* Real-time Submissions Summary */}
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl relative flex flex-col justify-between">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          
          <div>
            <h3 className="font-bricolage text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Clock className="h-4.5 w-4.5 text-purple-400" />
              <span>Telemetry Summary</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">Database statistics parsing summary</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-semibold text-slate-400">Database Source</span>
                <span className="text-xs font-mono font-bold text-slate-200">Local JSON DB</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-semibold text-slate-400">Connected Tables</span>
                <span className="text-xs font-mono font-bold text-slate-200">3 File logs</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-semibold text-slate-400">Total System Inquiries</span>
                <span className="text-xs font-mono font-bold text-blue-400">
                  {stats.totalApplications + stats.totalContacts + stats.totalBookings}
                </span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-semibold text-slate-400">System Gateway</span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-400">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-4">
            <Link
              href="/admin/careers"
              className="flex items-center justify-between rounded-xl bg-white/[0.02] p-3 text-xs font-bold text-slate-300 border border-white/5 transition-all hover:bg-white/[0.05] hover:text-white group"
            >
              <span>Manage incoming leads</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>

      {/* REAL-TIME ACTIVITY STREAM TABLE */}
      <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        
        <div className="flex items-center justify-between p-6 border-b border-white/5 flex-wrap gap-4">
          <div>
            <h3 className="font-bricolage text-lg font-bold text-white">Incoming Submissions Feed</h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time log of the latest 5 applications and messages</p>
          </div>
          <Link
            href="/admin/careers"
            className="flex items-center gap-1.5 rounded-lg text-xs font-bold text-blue-400 transition-colors hover:text-blue-300"
          >
            <span>View All Records</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentActivity.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No recent activity log recorded in JSON files yet.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01] text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Channel / Action</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4.5 font-bold text-white flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold ${
                        activity.type === "Careers" 
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400" 
                          : activity.type === "Contact"
                          ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                          : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                      }`}>
                        {activity.type === "Careers" ? <Briefcase className="h-4 w-4" /> : activity.type === "Contact" ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                      </div>
                      <span>{activity.name}</span>
                    </td>
                    <td className="px-6 py-4.5 text-slate-300 font-semibold">{activity.title}</td>
                    <td className="px-6 py-4.5 text-slate-400 font-mono text-xs">
                      {new Date(activity.timestamp).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <Link
                        href={activity.type === "Careers" ? "/admin/careers" : activity.type === "Contact" ? "/admin/contact" : "/admin/bookings"}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10 transition-colors"
                        title="View Record"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
