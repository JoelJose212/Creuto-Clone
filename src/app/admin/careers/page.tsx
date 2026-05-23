"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Briefcase, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Linkedin, 
  Mail, 
  Phone, 
  Calendar,
  ChevronRight,
  Loader2,
  RefreshCw,
  ExternalLink
} from "lucide-react"

export default function AdminCareers() {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [applications, setApplications] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  
  // Modals & details
  const [selectedApp, setSelectedApp] = useState<any | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [actionMessage, setActionMessage] = useState("")

  const fetchApplications = async (showIndicator = false) => {
    if (showIndicator) setRefreshing(true)
    try {
      const res = await fetch("/api/admin/careers")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setApplications(data.applications || [])
        }
      }
    } catch (err) {
      console.error("Error loading careers applications:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  // Handle status update
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true)
    setActionMessage("")
    try {
      const res = await fetch("/api/admin/careers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setActionMessage("Candidate status updated successfully!")
          // Refresh list locally
          setApplications(prev => 
            prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
          )
          if (selectedApp && selectedApp.id === id) {
            setSelectedApp((prev: any) => prev ? { ...prev, status: newStatus } : null)
          }
        }
      }
    } catch (err) {
      console.error("Error updating status:", err)
      setActionMessage("Failed to update status. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle candidate deletion
  const handleDeleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this application? This action is irreversible.")) {
      return
    }
    try {
      const res = await fetch(`/api/admin/careers?id=${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          alert("Application deleted successfully.")
          setApplications(prev => prev.filter(app => app.id !== id))
          setSelectedApp(null)
        }
      }
    } catch (err) {
      console.error("Error deleting application:", err)
      alert("Error deleting application.")
    }
  }

  // Generate and download CSV
  const handleExportCSV = () => {
    if (applications.length === 0) return

    // Define CSV headers
    const headers = ["ID", "FullName", "Email", "Mobile", "Role/Position", "Experience", "LinkedIn", "Why Aanandi / Message", "Resume Path", "Status", "Applied At"]
    
    // Construct rows
    const rows = filteredApplications.map(app => [
      app.id,
      app.fullName || app.name || "",
      app.email || "",
      app.mobile || "",
      app.position || "",
      app.experience || "",
      app.linkedinProfile || "",
      (app.whyAanandi || app.message || "").replace(/"/g, '""'), // Escape double quotes
      app.resumePath || app.resume || "",
      app.status,
      app.createdAt
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(val => `"${val}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `creuto_careers_applicants_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Get unique positions from candidate applications dynamically
  const uniqueRoles = Array.from(new Set(applications.map(app => app.position).filter(Boolean)))

  // Filter application results
  const filteredApplications = applications.filter(app => {
    const name = app.fullName || app.name || ""
    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.position && app.position.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "" || app.status === statusFilter
    const matchesRole = roleFilter === "" || app.position === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  // Status color pill mapper
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400"
      case "Interviewing":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400"
      case "Offered":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      case "Rejected":
        return "bg-red-500/10 border-red-500/20 text-red-400"
      default:
        return "bg-slate-500/10 border-slate-500/20 text-slate-400"
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-slate-400">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm font-semibold">Loading applications database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-jakarta text-slate-100 relative">
      
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Briefcase className="h-7 w-7 text-blue-400 animate-pulse" />
            <span>Careers Recruitment Hub</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Audit resumes, schedule interview calls, and manage candidate employment applications.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => fetchApplications(true)}
            disabled={refreshing}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm font-bold text-slate-300 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-blue-400" : ""}`} />
            <span>{refreshing ? "Syncing..." : "Reload Records"}</span>
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={filteredApplications.length === 0}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/35 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4.5 w-4.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="grid gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:grid-cols-2 md:grid-cols-4 lg:p-5 shadow-lg">
        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Filter className="h-4 w-4" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-[#070b1e] py-2 pl-10 pr-4 text-sm text-white transition-all focus:border-blue-500/40 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Position Filter */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Briefcase className="h-4 w-4" />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-[#070b1e] py-2 pl-10 pr-4 text-sm text-white transition-all focus:border-blue-500/40 focus:outline-none"
          >
            <option value="">All Positions</option>
            {uniqueRoles.map((role: string) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Result Counter */}
        <div className="flex items-center justify-end pr-2 text-xs font-mono font-bold text-slate-400">
          Showing {filteredApplications.length} of {applications.length} Applicants
        </div>
      </div>

      {/* APPLICATIONS LIST DATA TABLE */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-2xl">
        <div className="overflow-x-auto">
          {filteredApplications.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500 flex flex-col items-center gap-3">
              <AlertCircle className="h-8 w-8 text-slate-600 animate-bounce" />
              <span>No candidates found matching the active search or filters.</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01] text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Position / Role</th>
                  <th className="px-6 py-4">Applied Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredApplications.map((app) => (
                  <tr 
                    key={app.id} 
                    className="hover:bg-white/[0.01] transition-colors cursor-pointer group"
                    onClick={() => setSelectedApp(app)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                        {app.fullName || app.name || "Anonymous Candidate"}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 select-all" onClick={e => e.stopPropagation()}>
                        <Mail className="h-3 w-3 shrink-0" />
                        <span>{app.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-200">{app.position || "Developer"}</span>
                      {app.experience && (
                        <div className="text-[11px] text-slate-500 mt-0.5">Exp: {app.experience}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusBadgeStyle(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10 transition-all hover:scale-105"
                          title="View Application Details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(app.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all hover:scale-105"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* GLORIOUS DETAILED CANDIDATE MODAL VIEW */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Dark background blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[650px] overflow-hidden rounded-3xl border border-white/10 bg-[#0d122c] shadow-2xl z-50 p-6 md:p-8"
            >
              {/* Top border glowing highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:bg-white/[0.05] hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title Info */}
              <div className="border-b border-white/5 pb-5 mb-5 pr-8">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase ${getStatusBadgeStyle(selectedApp.status)}`}>
                    {selectedApp.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{selectedApp.id}</span>
                </div>
                <h2 className="font-bricolage text-2xl font-black text-white mt-2">
                  {selectedApp.fullName || selectedApp.name || "Anonymous Candidate"}
                </h2>
                <p className="text-sm text-blue-400 font-semibold mt-0.5">
                  Applicant for: <span className="text-white">{selectedApp.position || "Developer"}</span>
                </p>
              </div>

              {/* Action Alert Banner */}
              {actionMessage && (
                <div className="mb-5 rounded-xl bg-blue-600/10 border border-blue-500/20 p-3 text-xs text-blue-400 font-semibold">
                  {actionMessage}
                </div>
              )}

              {/* Content Grid */}
              <div className="space-y-5">
                
                {/* 1. Contact Information Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Email Address</span>
                    <a 
                      href={`mailto:${selectedApp.email}`}
                      className="text-xs text-white hover:text-blue-400 select-all font-semibold flex items-center gap-1.5 break-all"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>{selectedApp.email}</span>
                    </a>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Mobile Contact</span>
                    <a 
                      href={`tel:${selectedApp.mobile}`}
                      className="text-xs text-white hover:text-blue-400 select-all font-semibold flex items-center gap-1.5"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>{selectedApp.mobile || "Not specified"}</span>
                    </a>
                  </div>
                </div>

                {/* 2. Extra metadata */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">LinkedIn Profile</span>
                    {selectedApp.linkedinProfile ? (
                      <a 
                        href={selectedApp.linkedinProfile}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 truncate"
                      >
                        <Linkedin className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                        <span>Visit Profile</span>
                        <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500">Not provided</span>
                    )}
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Experience Level</span>
                    <span className="text-xs text-white font-semibold">
                      {selectedApp.experience || "Not provided"}
                    </span>
                  </div>
                </div>

                {/* 3. Cover Letter Message Details */}
                <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-left space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Why Aanandi & Cover Letter</span>
                  <div className="max-h-36 overflow-y-auto text-xs text-slate-300 leading-relaxed font-jakarta bg-black/25 p-3 rounded-lg border border-white/5 select-text">
                    {selectedApp.whyAanandi || selectedApp.message || "No message or cover letter submitted."}
                  </div>
                </div>

                {/* 4. Resume Attachment Action */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 border border-white/5 rounded-2xl bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600/10 text-red-400 border border-red-500/20 font-bold text-xs select-none">
                      PDF
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-white">Curriculum Vitae / Resume</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Click to audit resume</p>
                    </div>
                  </div>
                  {selectedApp.resumePath || selectedApp.resume ? (
                    <a
                      href={selectedApp.resumePath || selectedApp.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 items-center gap-1.5 rounded-xl bg-white/[0.05] border border-white/10 px-4 text-xs font-bold text-slate-300 transition-all hover:bg-white/[0.1] hover:text-white"
                    >
                      <span>Open Resume</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 font-bold">No file uploaded</span>
                  )}
                </div>

                {/* 5. Status Modifiers Action Controls */}
                <div className="border-t border-white/5 pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Modify Applicant Status</span>
                    <div className="flex flex-wrap gap-2">
                      {["New", "Interviewing", "Offered", "Rejected"].map((statusOption) => (
                        <button
                          key={statusOption}
                          disabled={isUpdating || selectedApp.status === statusOption}
                          onClick={() => handleUpdateStatus(selectedApp.id, statusOption)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                            selectedApp.status === statusOption
                              ? "bg-blue-600 border-blue-500 text-white font-extrabold"
                              : "border-white/10 hover:bg-white/[0.04] text-slate-300"
                          }`}
                        >
                          {statusOption}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 md:pt-0">
                    <button
                      onClick={() => handleDeleteApplication(selectedApp.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Purge Candidate</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
