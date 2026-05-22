"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  Loader2, 
  RefreshCw, 
  AlertCircle,
  Eye
} from "lucide-react"

interface Bulletin {
  id: string
  title: string
  content: string
  color: "pink" | "blue" | "yellow" | "green"
}

export default function AdminBulletins() {
  const [bulletins, setBulletins] = useState<Bulletin[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  // Form Composer State
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [color, setColor] = useState<"pink" | "blue" | "yellow" | "green">("pink")

  // Color mappings matching Careers PinBoard.tsx exactly
  const colorMap = {
    pink: {
      bg: "bg-[#ffd1dc] hover:bg-[#ffb6c1] border-[#f48fb1]",
      shadow: "shadow-pink-100/50",
      pin: "#ec4899",
      badge: "bg-pink-500/10 border-pink-500/20 text-pink-400"
    },
    blue: {
      bg: "bg-[#d1e8ff] hover:bg-[#b3d9ff] border-[#90caf9]",
      shadow: "shadow-blue-100/50",
      pin: "#3b82f6",
      badge: "bg-blue-500/10 border-blue-500/20 text-blue-400"
    },
    yellow: {
      bg: "bg-[#fff2cc] hover:bg-[#ffe699] border-[#ffe082]",
      shadow: "shadow-yellow-100/50",
      pin: "#eab308",
      badge: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
    },
    green: {
      bg: "bg-[#d4edda] hover:bg-[#c3e6cb] border-[#a5d6a7]",
      shadow: "shadow-green-100/50",
      pin: "#22c55e",
      badge: "bg-green-500/10 border-green-500/20 text-green-400"
    }
  }

  // Load bulletins from backend API
  const fetchBulletins = async (showIndicator = false) => {
    if (showIndicator) setRefreshing(true)
    try {
      const res = await fetch("/api/admin/bulletins")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setBulletins(data.bulletins || [])
        } else {
          showToast(data.error || "Failed to load bulletins", "error")
        }
      } else {
        showToast("Error linking to administrative database", "error")
      }
    } catch (err) {
      console.error("Error loading admin bulletins:", err)
      showToast("Network failure retrieving bulletins ledger", "error")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchBulletins()
  }, [])

  // Show a message toast that auto-dismisses
  const showToast = (text: string, type: "success" | "error") => {
    setActionMessage({ text, type })
    setTimeout(() => {
      setActionMessage(null)
    }, 4000)
  }

  // Handle publishing a new sticky bulletin
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      showToast("Please provide both a notice title and content description!", "error")
      return
    }

    if (title.length > 30) {
      showToast("Title is too long! Keep it under 30 characters.", "error")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/bulletins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, color })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          showToast("Bulletin notice pinned and published successfully! 📌", "success")
          // Prepend to current bulletins list
          setBulletins(prev => [data.bulletin, ...prev])
          // Reset form composer
          setTitle("")
          setContent("")
          setColor("pink")
        } else {
          showToast(data.error || "Failed to publish notice", "error")
        }
      } else {
        showToast("Server rejected bulletin publication", "error")
      }
    } catch (err) {
      console.error("Error publishing bulletin:", err)
      showToast("Network error publishing bulletin notice", "error")
    } finally {
      setSubmitting(false)
    }
  }

  // Handle unpinning/deleting a bulletin notice
  const handleUnpin = async (id: string) => {
    if (!confirm("Are you sure you want to unpin and permanently delete this notice? This will sync instantly with the Careers page board.")) {
      return
    }

    try {
      const res = await fetch(`/api/admin/bulletins?id=${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          showToast("Notice unpinned successfully! 📌🗑️", "success")
          setBulletins(prev => prev.filter(b => b.id !== id))
        } else {
          showToast(data.error || "Failed to unpin notice", "error")
        }
      } else {
        showToast("Server failed to unpin notice", "error")
      }
    } catch (err) {
      console.error("Error unpinning bulletin:", err)
      showToast("Network error trying to unpin bulletin", "error")
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-slate-400">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-500" />
          <p className="text-sm font-semibold">Synchronizing Bulletins Ledger...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 font-jakarta text-slate-100 relative">
      
      {/* Toast Alert Notifications */}
      <AnimatePresence>
        {actionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-24 right-8 z-50 flex items-center gap-2.5 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-md ${
              actionMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {actionMessage.type === "success" ? (
              <Check className="h-4.5 w-4.5" />
            ) : (
              <AlertCircle className="h-4.5 w-4.5" />
            )}
            <span className="text-xs font-semibold">{actionMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 shadow-lg">
              <Megaphone className="h-5.5 w-5.5" />
            </div>
            <div>
              <h1 className="font-bricolage text-2xl font-bold tracking-tight text-white">
                Bulletin Board Publisher
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Design and publish dynamic, styled sticky notes directly to the Careers pinboard
              </p>
            </div>
          </div>
        </div>

        {/* Sync Button */}
        <button
          onClick={() => fetchBulletins(true)}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/[0.05] active:scale-98 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>{refreshing ? "Refreshing..." : "Sync Board"}</span>
        </button>
      </div>

      {/* GRID COLUMN SECTION: FORM AND LIVE PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* LEFT COLUMN: Composer Form (3/5 width) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#0c122c]/60 backdrop-blur-md p-6 shadow-2xl relative overflow-hidden">
            
            {/* Top glassmorphic tag */}
            <div className="absolute top-0 right-0 h-[250px] w-[250px] rounded-full bg-blue-500/5 opacity-20 blur-[60px] pointer-events-none" />

            <h2 className="text-sm font-extrabold font-bricolage uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-blue-400" />
              <span>Compose New Bulletin Sticky Note</span>
            </h2>

            <form onSubmit={handlePublish} className="space-y-5">
              
              {/* Notice Title */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="title" className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Bulletin Title
                  </label>
                  <span className={`text-[10px] font-bold ${title.length > 30 ? "text-red-400" : "text-slate-500"}`}>
                    {title.length}/30 chars
                  </span>
                </div>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., 🚀 We are expanding our Web3 Team!"
                  maxLength={30}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#070b1e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-jakarta"
                  required
                />
              </div>

              {/* Notice Description Content */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="content" className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Notice Description
                  </label>
                  <span className="text-[10px] font-bold text-slate-500">
                    Keep it short for the note card aspect ratio
                  </span>
                </div>
                <textarea
                  id="content"
                  placeholder="Describe details regarding this notice, role details, links, schedules or corporate events..."
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#070b1e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none leading-relaxed font-jakarta"
                  required
                />
              </div>

              {/* Color Sticky Theme Picker */}
              <div className="space-y-2.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
                  Select Sticky Note Color Theme
                </label>
                <div className="flex flex-wrap gap-3">
                  {(["pink", "blue", "yellow", "green"] as const).map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setColor(col)}
                      className={`relative flex items-center justify-between gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all active:scale-95 ${
                        color === col
                          ? "border-white bg-white/10 text-white shadow-lg ring-2 ring-white/20"
                          : "border-white/5 bg-[#070b1e]/40 text-slate-400 hover:text-white hover:border-white/10"
                      }`}
                    >
                      {/* Color Circle */}
                      <span 
                        className="w-4 h-4 rounded-full border border-slate-900 flex-shrink-0"
                        style={{
                          backgroundColor: col === "pink" ? "#ffd1dc" : col === "blue" ? "#d1e8ff" : col === "yellow" ? "#fff2cc" : "#d4edda"
                        }}
                      />
                      <span className="capitalize">{col} Note</span>

                      {/* Selected Checkmark indicator */}
                      {color === col && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="h-2.5 w-2.5 stroke-[4]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3.5 px-6 shadow-lg shadow-blue-600/20 active:scale-98 transition-all text-sm font-bricolage tracking-wide"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      <span>Pinning and Syncing Bulletin...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4.5 w-4.5 stroke-[3]" />
                      <span>Pin Sticky to Board 📌</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Sticky Preview (2/5 width) */}
        <div className="lg:col-span-2 flex flex-col justify-stretch">
          <div className="rounded-3xl border border-white/10 bg-[#0c122c]/40 backdrop-blur-sm p-6 shadow-2xl flex flex-col h-full">
            
            <h2 className="text-sm font-extrabold font-bricolage uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
              <Eye className="h-4.5 w-4.5 text-blue-400" />
              <span>Real-Time Corkboard Preview</span>
            </h2>

            {/* Simulated Wooden Corkboard background */}
            <div className="flex-1 rounded-2xl border-4 border-slate-900 bg-[#eae1d0] p-6 shadow-inner relative flex items-center justify-center min-h-[300px] overflow-hidden corkboard-preview-grid">
              
              {/* Subtle corkboard grid pattern using styled background */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none" 
                style={{
                  backgroundImage: "radial-gradient(#5a3921 1.5px, transparent 1.5px)",
                  backgroundSize: "20px 20px"
                }}
              />

              {/* Preview Pinned Sticky Card */}
              <motion.div
                layout
                key={color}
                initial={{ scale: 0.9, rotate: -2, opacity: 0.8 }}
                animate={{ scale: 1, rotate: 1.5, opacity: 1 }}
                className={`relative border-2 border-slate-900 rounded-2xl p-6 ${colorMap[color].bg} ${colorMap[color].shadow} shadow-lg select-none w-full max-w-[280px] min-h-[190px] flex flex-col justify-between transition-all duration-300`}
              >
                {/* Pushpin SVG top-center */}
                <div className="absolute top-[-10px] left-[50%] translate-x-[-50%] z-10 w-6.5 h-6.5 pointer-events-none drop-shadow-md">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <circle cx="12" cy="7" r="5" fill={colorMap[color].pin} stroke="#1E293B" strokeWidth="2.5" />
                    <rect x="10.5" y="11" width="3" height="8" fill={colorMap[color].pin} stroke="#1E293B" strokeWidth="2" />
                    <line x1="12" y1="19" x2="12" y2="23" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Sticky notice body */}
                <div className="flex flex-col gap-2 pt-2">
                  <h5 className="font-bricolage text-[11px] font-black uppercase tracking-wide text-slate-900 border-b border-slate-900/10 pb-1.5 truncate">
                    {title.trim() || "👉 Bulletin Title Preview"}
                  </h5>
                  <p className="text-[10.5px] font-semibold leading-relaxed text-slate-800 break-words whitespace-pre-wrap max-h-[110px] overflow-y-auto pr-0.5">
                    {content.trim() || "Write bulletin details inside the composer form in the left column. This sticky note preview demonstrates exactly how it will pin, rotate, and colorize live on the visitor corkboard!"}
                  </p>
                </div>

                {/* Footer details */}
                <div className="mt-4 flex items-center justify-between text-[7px] font-bold text-slate-500 uppercase tracking-widest select-none border-t border-slate-900/5 pt-1.5">
                  <span>📌 Dynamic Pin</span>
                  <span>Creuto Hub</span>
                </div>
              </motion.div>

            </div>

            {/* Preview Hint */}
            <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-4">
              ✨ Live rotation and shadow styles are visualised in real-time
            </p>

          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: BULLETINS LEDGER */}
      <div className="rounded-3xl border border-white/10 bg-[#0c122c]/60 backdrop-blur-md p-6 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-sm font-extrabold font-bricolage uppercase tracking-wider text-white">
              Published Sticky Bulletins Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage live bulletin notes currently pinned to the active Careers pinboard ({bulletins.length} active)
            </p>
          </div>
        </div>

        {/* Ledger Grid / Table */}
        {bulletins.length === 0 ? (
          <div className="py-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center gap-3">
            <Megaphone className="h-8 w-8 text-slate-600 animate-pulse" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-300">No active bulletins published</p>
              <p className="text-xs text-slate-500">
                Pinboard will show fallback notices from constants/notices.json. Use the form above to pin your first dynamic bulletin!
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#070b1e]/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  <th className="px-6 py-4">Status / Color</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4 max-w-sm">Description Snippet</th>
                  <th className="px-6 py-4 text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bulletins.map((b) => {
                  const styleMap = colorMap[b.color] || colorMap.pink
                  return (
                    <tr key={b.id} className="hover:bg-white/[0.01] transition-all text-xs font-semibold text-slate-300">
                      
                      {/* Color Badge Indicator */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${styleMap.badge}`}>
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: b.color === "pink" ? "#ffd1dc" : b.color === "blue" ? "#d1e8ff" : b.color === "yellow" ? "#fff2cc" : "#d4edda"
                            }}
                          />
                          <span className="capitalize">{b.color} note</span>
                        </span>
                      </td>

                      {/* Notice Title */}
                      <td className="px-6 py-4 font-bold text-white max-w-xs truncate">
                        {b.title}
                      </td>

                      {/* Notice content snippet */}
                      <td className="px-6 py-4 max-w-sm truncate text-slate-400">
                        {b.content}
                      </td>

                      {/* Delete actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleUnpin(b.id)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-500/30 hover:border-red-500 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 text-xs font-bold active:scale-95 transition-all"
                          title="Unpin bulletin"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Unpin & Delete</span>
                        </button>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  )
}
