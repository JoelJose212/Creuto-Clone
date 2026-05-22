"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Menu, 
  FileText, 
  Trash2, 
  Plus, 
  Megaphone, 
  Sparkles, 
  Check,
  Edit2
} from "lucide-react"
import defaultNotices from "@/constants/notices.json"

interface Notice {
  id: string
  title: string
  content: string
  color: "pink" | "blue" | "yellow" | "green"
}

export default function PinBoard() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  
  // Composer Form States
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newColor, setNewColor] = useState<"pink" | "blue" | "yellow" | "green">("pink")
  const [composerError, setComposerError] = useState("")

  // Fetch notices from the server or fallback locally
  const fetchNotices = async () => {
    try {
      const res = await fetch("/api/careers/notices")
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.notices) {
          setNotices(data.notices)
          return
        }
      }
    } catch (err) {
      console.error("Error fetching careers notices from API:", err)
    }

    // Fallback loading mechanism
    const saved = localStorage.getItem("creuto_notices")
    if (saved) {
      try {
        setNotices(JSON.parse(saved))
      } catch (e) {
        setNotices(defaultNotices as Notice[])
      }
    } else {
      setNotices(defaultNotices as Notice[])
    }
  }

  // Load notices and automatically activate admin controls if the authorized session cookie is active
  useEffect(() => {
    fetchNotices()

    // Read cookie list
    const cookies = typeof document !== "undefined" ? document.cookie.split("; ") : []
    const sessionCookie = cookies.find(row => row.startsWith("creuto_admin_session="))
    if (sessionCookie && sessionCookie.split("=")[1] === "authorized") {
      setIsAdminMode(true)
    }
  }, [])

  // Handle adding new notice dynamically synchronized with the server
  const handlePinNotice = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) {
      setComposerError("Both title and content are required!")
      return
    }
    
    if (newTitle.length > 30) {
      setComposerError("Title is too long! Keep it under 30 characters.")
      return
    }
    
    setComposerError("")

    try {
      const res = await fetch("/api/admin/bulletins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
          color: newColor
        })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setNotices(prev => [data.bulletin, ...prev])
          // Reset Form
          setNewTitle("")
          setNewContent("")
          setNewColor("pink")
          setIsComposerOpen(false)
          return
        } else {
          setComposerError(data.error || "Failed to publish notice to the server.")
        }
      } else if (res.status === 401) {
        setComposerError("Unauthorized! Please log in to the admin panel at /admin/login to publish.")
      } else {
        setComposerError("Server failed to pin the notice.")
      }
    } catch (err) {
      console.error("Error pinning notice via server API:", err)
      setComposerError("Network error. Saving locally instead.")
      
      // Local fallback
      const notice: Notice = {
        id: `notice-${Date.now()}`,
        title: newTitle.trim(),
        content: newContent.trim(),
        color: newColor
      }
      const updated = [notice, ...notices]
      setNotices(updated)
      localStorage.setItem("creuto_notices", JSON.stringify(updated))
      
      // Reset Form
      setNewTitle("")
      setNewContent("")
      setNewColor("pink")
      setIsComposerOpen(false)
    }
  }

  // Handle deleting/unpinning a notice synchronized with the server
  const handleDeleteNotice = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/bulletins?id=${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setNotices(prev => prev.filter(n => n.id !== id))
          return
        }
      } else if (res.status === 401) {
        alert("Unauthorized! Please log in to the admin dashboard (/admin) to delete bulletins.")
        return
      }
    } catch (err) {
      console.error("Error unpinning bulletin notice:", err)
    }

    // Local fallback deletion
    const updated = notices.filter(n => n.id !== id)
    setNotices(updated)
    localStorage.setItem("creuto_notices", JSON.stringify(updated))
  }

  // Sticky color classes
  const colorMap = {
    pink: {
      bg: "bg-[#ffd1dc] hover:bg-[#ffb6c1] border-[#f48fb1]",
      shadow: "shadow-pink-100",
      pin: "#ec4899"
    },
    blue: {
      bg: "bg-[#d1e8ff] hover:bg-[#b3d9ff] border-[#90caf9]",
      shadow: "shadow-blue-100",
      pin: "#3b82f6"
    },
    yellow: {
      bg: "bg-[#fff2cc] hover:bg-[#ffe699] border-[#ffe082]",
      shadow: "shadow-yellow-100",
      pin: "#eab308"
    },
    green: {
      bg: "bg-[#d4edda] hover:bg-[#c3e6cb] border-[#a5d6a7]",
      shadow: "shadow-green-100",
      pin: "#22c55e"
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-badge {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes blink-eyes {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes sway-illustration {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-4px) rotate(0.5deg); }
        }
        .animate-float-badge {
          animation: float-badge 4s ease-in-out infinite;
        }
        .pulse-ring-active::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 9999px;
          border: 4px solid #facc15;
          animation: pulse-ring 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          z-index: -1;
        }
        .pinboard-blink {
          animation: blink-eyes 5s infinite;
          transform-origin: center;
        }
        .corkboard-grid {
          background-image: radial-gradient(#e2e8f0 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }
      `}} />

      {/* FLOATING ANNOUNCEMENT MEGAPHONE BADGE (Inspired by Image 2) */}
      <div className="fixed bottom-28 right-6 z-40 animate-float-badge select-none">
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative group w-28 h-28 rounded-full bg-white border-4 border-slate-900 shadow-xl flex items-center justify-center transition-transform active:scale-95 cursor-pointer pulse-ring-active overflow-hidden"
        >
          {/* Announcement Image Logo - Scaled to focus on the megaphone */}
          <img 
            src="/img/carrers/announcement_logo.jpg" 
            alt="Announcement Logo" 
            className="w-full h-full object-cover rounded-full scale-[1.35] group-hover:scale-[1.45] transition-transform duration-300"
          />

          {/* Premium Dynamic Sparkles */}
          <div className="absolute top-2 left-3 text-[#facc15] animate-pulse drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            <Sparkles size={16} className="fill-[#facc15]" />
          </div>
          <div className="absolute bottom-6 right-3 text-white animate-bounce drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            <Sparkles size={12} className="fill-white" />
          </div>

          {/* Stark Black Ribbon Diagonal Banner (Restored for max visibility) */}
          <div className="absolute bottom-3 left-[-16px] right-[-16px] bg-slate-900 border-2 border-white text-white text-[9.5px] font-black tracking-wider py-1 px-1 rotate-[-12deg] rounded-sm shadow-md text-center uppercase whitespace-nowrap overflow-hidden z-10 group-hover:scale-105 transition-all">
            We Are Hiring!
          </div>
        </button>
      </div>
 
      {/* CORE PIN BOARD MODAL OVERLAY (Inspired by Image 1) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-24 sm:pt-28 select-none">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false)
                setIsComposerOpen(false)
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Card container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-[32px] border-4 border-slate-900 shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* CORKBOARD TOP HEADER BAR (Exactly matching Image 1 layout) */}
              <div className="flex items-center justify-between px-6 py-4 border-b-4 border-slate-900 bg-white relative z-20">
                {/* Left hamburger */}
                <button 
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`p-2 rounded-xl border-2 border-transparent hover:border-slate-900 active:bg-slate-100 transition-all ${isAdminMode ? 'bg-[#facc15]/20 border-slate-900' : ''}`}
                  title="Toggle Admin Mode to Edit/Add"
                >
                  <Menu size={20} className="text-slate-900 stroke-[2.5px]" />
                </button>

                {/* Center Heading & Pencil Icon */}
                <div className="flex items-center gap-3">
                  <h3 className="font-bricolage text-sm sm:text-base font-extrabold uppercase tracking-widest text-slate-900">
                    {isAdminMode ? "💡 Bulletin Admin Panel" : "📌 Creuto Pin Board"}
                  </h3>
                  
                  {/* Pencil Icon circular button inside circle (from Image 1 center button) */}
                  <button
                    onClick={() => {
                      setIsAdminMode(true)
                      setIsComposerOpen(!isComposerOpen)
                    }}
                    className={`w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center transition-all ${
                      isComposerOpen 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-white text-slate-900 hover:bg-slate-100 active:scale-95 shadow-sm'
                    }`}
                    title="Add a New Notice"
                  >
                    <Edit2 size={14} className="stroke-[2.5]" />
                  </button>
                </div>

                {/* Right pushpin and clipboard logo icons */}
                <div className="flex items-center gap-3">
                  {/* Pin icon */}
                  <div className="w-9 h-9 rounded-xl border-2 border-[#1d4ed8]/10 bg-[#1d4ed8]/5 flex items-center justify-center text-[#1d4ed8]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="17" x2="12" y2="22"></line>
                      <path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.78-3.55A2 2 0 0 1 15 9.24V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.24a2 2 0 0 1-.78 1.21L5.44 14a2 2 0 0 0-.44 1.24z"></path>
                    </svg>
                  </div>
                  {/* Close cross */}
                  <button
                    onClick={() => {
                      setIsModalOpen(false)
                      setIsComposerOpen(false)
                    }}
                    className="w-9 h-9 rounded-xl border-2 border-slate-200 hover:border-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <X size={18} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* ADMIN COMPOSER PANEL (Dynamically Slides down) */}
              <AnimatePresence>
                {isComposerOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-b-4 border-slate-900 bg-slate-50 p-6 flex flex-col gap-4 overflow-hidden"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <span>Create New Bulletin Notice</span>
                      <Sparkles size={12} className="text-[#facc15] fill-[#facc15]" />
                    </h4>

                    {composerError && (
                      <p className="text-red-500 text-xs font-bold">{composerError}</p>
                    )}

                    <form onSubmit={handlePinNotice} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Inputs columns */}
                      <div className="sm:col-span-2 flex flex-col gap-3">
                        <input
                          type="text"
                          placeholder="Notice Title (e.g. 🚀 AI Division Expansion)"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-100"
                        />
                        <textarea
                          placeholder="Notice content text..."
                          rows={3}
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          className="w-full bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                        />
                      </div>

                      {/* Color Picker & Submit */}
                      <div className="flex flex-col justify-between gap-3">
                        {/* Colors */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Sticky Color</span>
                          <div className="flex gap-2">
                            {(["pink", "blue", "yellow", "green"] as const).map((col) => (
                              <button
                                key={col}
                                type="button"
                                onClick={() => setNewColor(col)}
                                className={`w-8 h-8 rounded-lg border-2 border-slate-900 transition-all ${
                                  newColor === col ? 'scale-110 ring-4 ring-blue-200' : 'opacity-70 hover:opacity-100'
                                }`}
                                style={{
                                  backgroundColor: col === "pink" ? "#ffd1dc" : col === "blue" ? "#d1e8ff" : col === "yellow" ? "#fff2cc" : "#d4edda"
                                }}
                              >
                                {newColor === col && <Check size={14} className="mx-auto text-slate-800 stroke-[3px]" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 bg-[#facc15] hover:bg-[#eab308] border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <Plus size={14} className="stroke-[3]" />
                          <span>Pin Bulletin 📌</span>
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* DYNAMIC SCROLLABLE BODY */}
              <div className="flex-1 overflow-y-auto p-8 corkboard-grid bg-[#fafafa]">
                {notices.length > 0 ? (
                  /* RENDER ACTIVE STICKY NOTES BOARD */
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {notices.map((notice, idx) => {
                      const colors = colorMap[notice.color]
                      // Alternating rotation angles for corkboard feel
                      const rotations = ["rotate-1.5", "-rotate-2", "rotate-1", "-rotate-1.5", "rotate-2"]
                      const rotClass = rotations[idx % rotations.length]

                      return (
                        <motion.div
                          layout
                          key={notice.id}
                          className={`relative ${rotClass} border-2 border-slate-900 rounded-2xl p-6 ${colors.bg} ${colors.shadow} shadow-md transition-all duration-300 hover:rotate-0 hover:-translate-y-2 hover:shadow-xl group flex flex-col justify-between min-h-[180px]`}
                        >
                          {/* Pushpin SVG top-center */}
                          <div className="absolute top-[-10px] left-[50%] translate-x-[-50%] z-10 w-6 h-6 pointer-events-none drop-shadow-sm">
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                              <circle cx="12" cy="7" r="5" fill={colors.pin} stroke="#1E293B" strokeWidth="2.5" />
                              <rect x="10.5" y="11" width="3" height="8" fill={colors.pin} stroke="#1E293B" strokeWidth="2" />
                              <line x1="12" y1="19" x2="12" y2="23" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                          </div>

                          {/* Unpin/Delete button (Only visible & accessible when Admin Mode is active) */}
                          {isAdminMode && (
                            <button
                              onClick={() => handleDeleteNotice(notice.id)}
                              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-red-500 text-white border-2 border-slate-900 flex items-center justify-center transition-transform hover:scale-115 active:scale-95 shadow-sm z-10 cursor-pointer"
                              title="Unpin Notice"
                            >
                              <Trash2 size={11} className="stroke-[2.5]" />
                            </button>
                          )}

                          {/* Notice text */}
                          <div className="flex flex-col gap-2 pt-2">
                            <h5 className="font-bricolage text-xs font-black uppercase tracking-wide text-slate-900 border-b border-slate-900/10 pb-1.5">
                              {notice.title}
                            </h5>
                            <p className="text-[11px] font-semibold leading-relaxed text-slate-800">
                              {notice.content}
                            </p>
                          </div>

                          {/* Pinned time reference */}
                          <div className="mt-4 flex items-center justify-between text-[8px] font-bold text-slate-500 uppercase tracking-widest select-none">
                            <span>📌 Pinned Bulletin</span>
                            <span>Creuto Hub</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  /* CARTOON BOARD EMPTY-STATE (Vector SVG matching Image 1 layout) */
                  <div className="max-w-md mx-auto py-6 flex flex-col items-center justify-center text-center">
                    
                    {/* SVG Illustration of smiling pin board from Image 1 */}
                    <div className="w-56 h-48 mb-6 relative animate-sway-illustration" style={{ animation: "sway-illustration 4s ease-in-out infinite" }}>
                      <svg viewBox="0 0 240 200" className="w-full h-full drop-shadow-lg">
                        {/* Sparkles / Twinkling stars */}
                        <path d="M 30 50 L 33 58 L 41 61 L 33 64 L 30 72 L 27 64 L 19 61 L 27 58 Z" fill="#facc15" />
                        <path d="M 210 140 L 212 146 L 218 148 L 212 150 L 210 156 L 208 150 L 202 148 L 208 146 Z" fill="#facc15" />
                        <path d="M 220 40 L 221 44 L 225 45 L 221 46 L 220 50 L 219 46 L 215 45 L 219 44 Z" fill="#facc15" />

                        {/* Bulletin Corkboard Frame */}
                        <rect x="50" y="30" width="140" height="100" rx="16" fill="#cbd5e1" stroke="#1E293B" strokeWidth="4.5" />
                        <rect x="56" y="36" width="128" height="88" rx="10" fill="#f8fafc" />

                        {/* Cute Smiling Face Details */}
                        {/* Eyes (Blinking animation using CSS class) */}
                        <g className="pinboard-blink">
                          <ellipse cx="105" cy="76" rx="4.5" ry="7" fill="#1E293B" />
                          <circle cx="106.5" cy="73" r="1.5" fill="#ffffff" />
                          <ellipse cx="135" cy="76" rx="4.5" ry="7" fill="#1E293B" />
                          <circle cx="136.5" cy="73" r="1.5" fill="#ffffff" />
                        </g>

                        {/* Pink blushing cheeks */}
                        <ellipse cx="94" cy="85" rx="5" ry="3.5" fill="#ff80b3" opacity="0.75" />
                        <ellipse cx="146" cy="85" rx="5" ry="3.5" fill="#ff80b3" opacity="0.75" />

                        {/* Smiling Mouth */}
                        <path d="M 115 84 Q 120 90 125 84" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />

                        {/* Pinned Sticky Notes in corners */}
                        {/* Green note bottom-left */}
                        <rect x="68" y="85" width="22" height="22" rx="3" fill="#86efac" stroke="#1E293B" strokeWidth="3" transform="rotate(-8 68 85)" />
                        {/* Pink pushpin on green note */}
                        <circle cx="68" cy="80" r="3" fill="#f43f5e" stroke="#1E293B" strokeWidth="2" />

                        {/* Blue note top-right */}
                        <rect x="150" y="48" width="22" height="22" rx="3" fill="#93c5fd" stroke="#1E293B" strokeWidth="3" transform="rotate(12 150 48)" />
                        {/* Pink pushpin on blue note */}
                        <circle cx="166" cy="46" r="3" fill="#f43f5e" stroke="#1E293B" strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Empty State Text Layout */}
                    <h4 className="font-bricolage text-base font-extrabold text-slate-900 tracking-tight mb-2">
                      Pin it up.
                    </h4>
                    
                    <p className="text-xs font-bold leading-relaxed text-slate-500 mb-4 max-w-sm">
                      This is where we organise all the notices and announcements you want to keep track of. 
                      Stay tuned for dynamic updates directly from our AI and Product teams!
                    </p>

                    <div className="bg-[#f1f5f9] border border-dashed border-slate-300 rounded-2xl p-4 text-[10px] font-bold text-slate-500 leading-relaxed flex items-center justify-center gap-2 max-w-xs mx-auto">
                      <span>It's pretty empty here right now. Click the pencil icon at the top to pin your first bulletin notice!</span>
                    </div>

                  </div>
                )}
              </div>

              {/* MODAL FOOTER */}
              <div className="px-8 py-4 border-t-4 border-slate-900 bg-white flex items-center justify-between text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                <span>© Creuto Labs Bulletins</span>
                <span className="text-[#1d4ed8]">✨ Pinned With Care</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
