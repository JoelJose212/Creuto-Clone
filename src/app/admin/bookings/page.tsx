"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  PhoneCall, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  AlertCircle, 
  X, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  Loader2,
  RefreshCw,
  MessageSquare,
  CheckCircle2,
  XCircle
} from "lucide-react"

export default function AdminBookings() {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [bookings, setBookings] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  
  // Modals & details
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [actionMessage, setActionMessage] = useState("")

  const fetchBookings = async (showIndicator = false) => {
    if (showIndicator) setRefreshing(true)
    try {
      const res = await fetch("/api/admin/bookings")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setBookings(data.bookings || [])
        }
      }
    } catch (err) {
      console.error("Error loading admin bookings:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Handle status update
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true)
    setActionMessage("")
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setActionMessage("Booking status updated successfully!")
          setBookings(prev => 
            prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
          )
          if (selectedBooking && selectedBooking.id === id) {
            setSelectedBooking((prev: any) => prev ? { ...prev, status: newStatus } : null)
          }
        }
      }
    } catch (err) {
      console.error("Error updating booking status:", err)
      setActionMessage("Failed to update status. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle booking deletion
  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to permanently remove this booking? This action is irreversible.")) {
      return
    }
    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          alert("Booking deleted successfully.")
          setBookings(prev => prev.filter(b => b.id !== id))
          setSelectedBooking(null)
        }
      }
    } catch (err) {
      console.error("Error deleting booked call:", err)
      alert("Error deleting booking.")
    }
  }

  // Generate and download CSV
  const handleExportCSV = () => {
    if (bookings.length === 0) return

    // Define CSV headers
    const headers = ["ID", "Client Name", "Email", "Mobile Contact", "Meeting Date", "Meeting TimeSlot", "Meeting Formatted", "Consult Message", "Status", "Booked At"]
    
    // Construct rows
    const rows = filteredBookings.map(b => [
      b.id,
      b.name || "",
      b.email || "",
      b.mobile || "",
      b.date || "",
      b.timeSlot || "",
      b.selectedTime || "",
      (b.message || "").replace(/"/g, '""'), // Escape double quotes
      b.status,
      b.createdAt
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(val => `"${val}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `moolsap_call_bookings_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter booking results
  const filteredBookings = bookings.filter(b => {
    const name = b.name || ""
    const messageDetails = b.message || ""
    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      messageDetails.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "" || b.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Status color pill mapper
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400"
      case "Completed":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      case "Cancelled":
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
          <p className="text-sm font-semibold">Loading bookings database...</p>
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
            <PhoneCall className="h-7 w-7 text-amber-400 animate-pulse" />
            <span>Consult Call Bookings</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Track client call schedulers, monitor consult calendars, and toggle appointment meetings.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => fetchBookings(true)}
            disabled={refreshing}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm font-bold text-slate-300 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-blue-400" : ""}`} />
            <span>{refreshing ? "Syncing..." : "Reload Records"}</span>
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={filteredBookings.length === 0}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 text-sm font-bold text-white shadow-lg shadow-amber-600/20 transition-all hover:bg-amber-500 hover:shadow-amber-500/35 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4.5 w-4.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="grid gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:grid-cols-3 lg:p-5 shadow-lg">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search bookings by client details or project message..."
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
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Result Count details */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 px-1">
        <span>Scheduled timeline</span>
        <span>Showing {filteredBookings.length} of {bookings.length} Booked Appointments</span>
      </div>

      {/* BOOKINGS TIMELINE GRID DATA TABLE */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-2xl">
        <div className="overflow-x-auto">
          {filteredBookings.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500 flex flex-col items-center gap-3">
              <AlertCircle className="h-8 w-8 text-slate-600 animate-bounce" />
              <span>No booked call appointments found matching your search.</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01] text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Meeting Time & Date</th>
                  <th className="px-6 py-4">Consult Guidelines</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredBookings.map((b) => (
                  <tr 
                    key={b.id} 
                    className="hover:bg-white/[0.01] transition-colors cursor-pointer group"
                    onClick={() => setSelectedBooking(b)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white group-hover:text-amber-400 transition-colors">
                        {b.name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 select-all" onClick={e => e.stopPropagation()}>
                        <Mail className="h-3 w-3 shrink-0" />
                        <span>{b.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{new Date(b.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-mono font-bold select-none">
                        <Clock className="h-3 w-3 text-amber-500/80 animate-pulse" />
                        <span>{b.timeSlot}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-[280px]">
                      {b.message ? (
                        <p className="text-slate-300 truncate text-xs select-none">{b.message}</p>
                      ) : (
                        <span className="text-slate-500 italic text-xs select-none">No custom scope details provided</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusBadgeStyle(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10 transition-all hover:scale-105"
                          title="View Appointment details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all hover:scale-105"
                          title="Purge Booking"
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

      {/* DETAILED MEETING MODAL VIEW */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[600px] overflow-hidden rounded-3xl border border-white/10 bg-[#0d122c] shadow-2xl z-50 p-6 md:p-8"
            >
              {/* Glowing card border lights */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

              {/* Close button */}
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:bg-white/[0.05] hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title info block */}
              <div className="border-b border-white/5 pb-5 mb-5 pr-8">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase ${getStatusBadgeStyle(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{selectedBooking.id}</span>
                </div>
                <h2 className="font-bricolage text-2xl font-black text-white mt-2">
                  {selectedBooking.name}
                </h2>
                <p className="text-xs text-amber-400 font-semibold mt-0.5">
                  Meeting Agenda: <span className="text-white">MoolSap Discovery Call</span>
                </p>
              </div>

              {/* Status Update Banner */}
              {actionMessage && (
                <div className="mb-5 rounded-xl bg-amber-600/10 border border-amber-500/20 p-3 text-xs text-amber-400 font-semibold">
                  {actionMessage}
                </div>
              )}

              {/* Content fields info */}
              <div className="space-y-5">
                
                {/* Visual Scheduled Time Panel */}
                <div className="rounded-2xl border border-amber-500/20 bg-amber-600/5 p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600/10 text-amber-400 border border-amber-500/20">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-wider text-amber-400">Meeting Date</p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {new Date(selectedBooking.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-amber-600/20 px-3.5 py-1.5 text-xs font-mono font-bold text-amber-400 border border-amber-500/20">
                    {selectedBooking.timeSlot}
                  </div>
                </div>

                {/* Client Contact Coordinates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Email address</span>
                    <a 
                      href={`mailto:${selectedBooking.email}`}
                      className="text-xs text-white hover:text-amber-400 select-all font-semibold flex items-center gap-1.5 break-all"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{selectedBooking.email}</span>
                    </a>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Mobile Contact Phone</span>
                    <a 
                      href={`tel:${selectedBooking.mobile}`}
                      className="text-xs text-white hover:text-amber-400 select-all font-semibold flex items-center gap-1.5"
                    >
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{selectedBooking.mobile || "Not specified"}</span>
                    </a>
                  </div>
                </div>

                {/* Consult Guidelines message details */}
                <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-left space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Consult Guidelines / Scope Details</span>
                  <div className="max-h-48 overflow-y-auto text-xs text-slate-300 leading-relaxed font-jakarta bg-black/25 p-3.5 rounded-lg border border-white/5 select-text">
                    {selectedBooking.message || "No project parameters or guidelines provided."}
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Modify Appointment Status</span>
                    <div className="flex gap-2">
                      {["Pending", "Completed", "Cancelled"].map((statusOption) => (
                        <button
                          key={statusOption}
                          disabled={isUpdating || selectedBooking.status === statusOption}
                          onClick={() => handleUpdateStatus(selectedBooking.id, statusOption)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                            selectedBooking.status === statusOption
                              ? "bg-amber-600 border-amber-500 text-white font-extrabold"
                              : "border-white/10 hover:bg-white/[0.04] text-slate-300"
                          }`}
                        >
                          {statusOption}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 sm:pt-0">
                    <button
                      onClick={() => handleDeleteBooking(selectedBooking.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Purge Call</span>
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
