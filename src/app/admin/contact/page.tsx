"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mail, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  AlertCircle, 
  X, 
  Phone, 
  Building,
  Calendar,
  Loader2,
  RefreshCw,
  MessageSquare
} from "lucide-react"

export default function AdminContact() {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [contacts, setContacts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [serviceFilter, setServiceFilter] = useState("")
  
  // Modals & details
  const [selectedContact, setSelectedContact] = useState<any | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [actionMessage, setActionMessage] = useState("")

  const fetchContacts = async (showIndicator = false) => {
    if (showIndicator) setRefreshing(true)
    try {
      const res = await fetch("/api/admin/contacts")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setContacts(data.contacts || [])
        }
      }
    } catch (err) {
      console.error("Error loading admin contacts:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  // Handle status update
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true)
    setActionMessage("")
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setActionMessage("Contact status updated successfully!")
          setContacts(prev => 
            prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
          )
          if (selectedContact && selectedContact.id === id) {
            setSelectedContact((prev: any) => prev ? { ...prev, status: newStatus } : null)
          }
        }
      }
    } catch (err) {
      console.error("Error updating contact status:", err)
      setActionMessage("Failed to update status. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle contact deletion
  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry? This action is irreversible.")) {
      return
    }
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          alert("Inquiry deleted successfully.")
          setContacts(prev => prev.filter(c => c.id !== id))
          setSelectedContact(null)
        }
      }
    } catch (err) {
      console.error("Error deleting contact inquiry:", err)
      alert("Error deleting inquiry.")
    }
  }

  // Generate and download CSV
  const handleExportCSV = () => {
    if (contacts.length === 0) return

    // Define CSV headers
    const headers = ["ID", "Inquirer Name", "Email", "Mobile", "Company Name", "Interested Services", "Message Details", "Status", "Received At"]
    
    // Construct rows
    const rows = filteredContacts.map(c => [
      c.id,
      c.name || "",
      c.email || "",
      c.mobile || "",
      c.company || "",
      (c.services || []).join(" | "),
      (c.message || "").replace(/"/g, '""'), // Escape double quotes
      c.status,
      c.createdAt
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(val => `"${val}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `moolsap_contact_leads_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Get unique services from inquiries dynamically
  const uniqueServices = Array.from(
    new Set(contacts.flatMap(c => c.services || []).filter(Boolean))
  )

  // Filter inquiry results
  const filteredContacts = contacts.filter(c => {
    const name = c.name || ""
    const companyName = c.company || ""
    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "" || c.status === statusFilter
    const matchesService = serviceFilter === "" || (c.services && c.services.includes(serviceFilter))

    return matchesSearch && matchesStatus && matchesService
  })

  // Status color pill mapper
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "New":
        return "bg-purple-500/10 border-purple-500/20 text-purple-400"
      case "Read":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400"
      case "Replied":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      default:
        return "bg-slate-500/10 border-slate-500/20 text-slate-400"
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-slate-400">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm font-semibold">Loading inquiries database...</p>
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
            <Mail className="h-7 w-7 text-purple-400 animate-pulse" />
            <span>Contact Inquiries Portal</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Audit public contact form inquiries, log client service interests, and manage outreach.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => fetchContacts(true)}
            disabled={refreshing}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm font-bold text-slate-300 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-blue-400" : ""}`} />
            <span>{refreshing ? "Syncing..." : "Reload Records"}</span>
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={filteredContacts.length === 0}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition-all hover:bg-purple-500 hover:shadow-purple-500/35 disabled:opacity-50 disabled:cursor-not-allowed"
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
            placeholder="Search leads..."
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
            <option value="Read">Read</option>
            <option value="Replied">Replied</option>
          </select>
        </div>

        {/* Service Filter */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <MessageSquare className="h-4 w-4" />
          </div>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-[#070b1e] py-2 pl-10 pr-4 text-sm text-white transition-all focus:border-blue-500/40 focus:outline-none"
          >
            <option value="">All Services</option>
            {uniqueServices.map((srv: string) => (
              <option key={srv} value={srv}>{srv}</option>
            ))}
          </select>
        </div>

        {/* Result Counter */}
        <div className="flex items-center justify-end pr-2 text-xs font-mono font-bold text-slate-400">
          Showing {filteredContacts.length} of {contacts.length} Inquiries
        </div>
      </div>

      {/* CONTACT LIST DATA TABLE */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-2xl">
        <div className="overflow-x-auto">
          {filteredContacts.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500 flex flex-col items-center gap-3">
              <AlertCircle className="h-8 w-8 text-slate-600 animate-bounce" />
              <span>No contact inquiries found matching the active search or filters.</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01] text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
                  <th className="px-6 py-4">Inquirer</th>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Service Interests</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredContacts.map((c) => (
                  <tr 
                    key={c.id} 
                    className="hover:bg-white/[0.01] transition-colors cursor-pointer group"
                    onClick={() => setSelectedContact(c)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white group-hover:text-purple-400 transition-colors">
                        {c.name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 select-all" onClick={e => e.stopPropagation()}>
                        <Mail className="h-3 w-3 shrink-0" />
                        <span>{c.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{c.company || "General"}</span>
                      </div>
                      {c.mobile && (
                        <div className="text-[11px] text-slate-500 mt-0.5 select-all" onClick={e => e.stopPropagation()}>
                          Phone: {c.mobile}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {c.services && c.services.length > 0 ? (
                          c.services.map((srv: string) => (
                            <span key={srv} className="rounded bg-white/[0.03] border border-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                              {srv}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-500 italic">General Consult</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusBadgeStyle(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10 transition-all hover:scale-105"
                          title="View Message details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(c.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all hover:scale-105"
                          title="Delete Inquiry"
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

      {/* DETAILED MESSAGE MODAL VIEW */}
      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Dark backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedContact(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[600px] overflow-hidden rounded-3xl border border-white/10 bg-[#0d122c] shadow-2xl z-50 p-6 md:p-8"
            >
              {/* Glowing header light */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedContact(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:bg-white/[0.05] hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title info */}
              <div className="border-b border-white/5 pb-5 mb-5 pr-8">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase ${getStatusBadgeStyle(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{selectedContact.id}</span>
                </div>
                <h2 className="font-bricolage text-2xl font-black text-white mt-2">
                  {selectedContact.name}
                </h2>
                <p className="text-sm text-purple-400 font-semibold mt-0.5 flex items-center gap-1">
                  <Building className="h-3.5 w-3.5 inline text-slate-400" />
                  <span>Company: <span className="text-white">{selectedContact.company || "General Consultation"}</span></span>
                </p>
              </div>

              {/* Action Response Banner */}
              {actionMessage && (
                <div className="mb-5 rounded-xl bg-purple-600/10 border border-purple-500/20 p-3 text-xs text-purple-400 font-semibold">
                  {actionMessage}
                </div>
              )}

              {/* Grid content details */}
              <div className="space-y-5">
                
                {/* Contact Coordinates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Email Address</span>
                    <a 
                      href={`mailto:${selectedContact.email}`}
                      className="text-xs text-white hover:text-purple-400 select-all font-semibold flex items-center gap-1.5 break-all"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{selectedContact.email}</span>
                    </a>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Mobile Phone</span>
                    <a 
                      href={`tel:${selectedContact.mobile}`}
                      className="text-xs text-white hover:text-purple-400 select-all font-semibold flex items-center gap-1.5"
                    >
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{selectedContact.mobile || "Not specified"}</span>
                    </a>
                  </div>
                </div>

                {/* Service tags list */}
                <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Service Interests Checked</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedContact.services && selectedContact.services.length > 0 ? (
                      selectedContact.services.map((srv: string) => (
                        <span key={srv} className="rounded-lg bg-purple-600/10 border border-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300">
                          {srv}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No specific service tags selected (General Consultation)</span>
                    )}
                  </div>
                </div>

                {/* Full Message Details */}
                <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-left space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Lead Message Content</span>
                  <div className="max-h-48 overflow-y-auto text-xs text-slate-300 leading-relaxed font-jakarta bg-black/25 p-3.5 rounded-lg border border-white/5 select-text">
                    {selectedContact.message || "Empty message body submitted."}
                  </div>
                </div>

                {/* Status action bar & deletion */}
                <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Inquiry Status Action</span>
                    <div className="flex gap-2">
                      {["New", "Read", "Replied"].map((statusOption) => (
                        <button
                          key={statusOption}
                          disabled={isUpdating || selectedContact.status === statusOption}
                          onClick={() => handleUpdateStatus(selectedContact.id, statusOption)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                            selectedContact.status === statusOption
                              ? "bg-purple-600 border-purple-500 text-white font-extrabold"
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
                      onClick={() => handleDeleteContact(selectedContact.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Lead</span>
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
