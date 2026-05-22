"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  CalendarCheck
} from "lucide-react"
import Link from "next/link"

export default function BookACall() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [message, setMessage] = useState("")
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Available visual time slots
  const TIME_SLOTS = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ]

  // Calculate next 14 business days (skipping Sundays)
  const [availableDays, setAvailableDays] = useState<Date[]>([])

  useEffect(() => {
    const days: Date[] = []
    let current = new Date()
    // Start tomorrow or today depending on time
    current.setDate(current.getDate() + 1)

    while (days.length < 12) {
      // 0 = Sunday
      if (current.getDay() !== 0) {
        days.push(new Date(current))
      }
      current.setDate(current.getDate() + 1)
    }
    setAvailableDays(days)
    // Select first day by default
    if (days.length > 0) {
      setSelectedDate(days[0].toISOString().split("T")[0])
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          mobile,
          message,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setSuccessMessage(data.message)
        setStep(3) // Go to success confirmation screen
      } else {
        setError(data.error || "Failed to schedule. Please try again.")
      }
    } catch (err) {
      console.error("Client booking submission error:", err)
      setError("An unexpected network error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070b1e] px-4 py-16 font-jakarta text-white select-none">
      {/* Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-blue-600/20 opacity-30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-600/20 opacity-25 blur-[150px] pointer-events-none" />

      {/* Main visual Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[700px] rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        {/* Step Indicator Header (Only on Step 1 & 2) */}
        {step < 3 && (
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <span className="rounded-full bg-blue-600/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-400 border border-blue-500/10">
                Outreach Engine
              </span>
              <h1 className="font-bricolage text-2xl font-black text-white md:text-3xl mt-1.5 flex items-center gap-2">
                <CalendarCheck className="h-7 w-7 text-blue-400" />
                <span>Schedule a Discovery Call</span>
              </h1>
            </div>
            <div className="text-right font-mono text-xs text-slate-400 font-bold">
              Step <span className="text-white">{step}</span> of 2
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: SELECT DATE & TIME SLOT */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              {/* Day Selection */}
              <div className="space-y-3 text-left">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-blue-400" />
                  <span>Choose an Available Date</span>
                </label>
                <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
                  {availableDays.map((day) => {
                    const dateStr = day.toISOString().split("T")[0]
                    const isSelected = selectedDate === dateStr
                    const isToday = new Date().toDateString() === day.toDateString()

                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`flex flex-col items-center justify-center rounded-xl border p-2.5 transition-all active:scale-95 ${
                          isSelected
                            ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/15 font-bold scale-[1.03]"
                            : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wide opacity-60">
                          {day.toLocaleDateString("en-US", { weekday: "short" })}
                        </span>
                        <span className="text-base font-extrabold mt-1">
                          {day.getDate()}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider font-semibold opacity-70 mt-0.5">
                          {day.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots Selection */}
              <div className="space-y-3 text-left">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span>Select an Available Time Slot (30m consultation)</span>
                </label>
                <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTimeSlot === slot
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 transition-all text-xs font-bold active:scale-95 ${
                          isSelected
                            ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/15 scale-[1.02]"
                            : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5 opacity-60" />
                        <span>{slot}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step Navigation */}
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span>Provide Contact Details</span>
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CONTACT DETAILS FORM */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-400 text-left"
                  >
                    <AlertCircle className="mt-0.5 h-4.5 w-4.5 text-red-400 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Scheduled summary card */}
                <div className="rounded-2xl border border-blue-500/20 bg-blue-600/5 p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-wider text-blue-400">Scheduled Call Details</p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-600/20 px-3.5 py-1.5 text-xs font-mono font-bold text-blue-400 border border-blue-500/20">
                    {selectedTimeSlot}
                  </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="grid gap-4 sm:grid-cols-2 text-left">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name"
                        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-blue-500/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-blue-500/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Mobile Input */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mobile Contact (Optional)</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-blue-500/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Project scope or consult guidelines</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute top-3 left-3 text-slate-400">
                        <FileText className="h-4 w-4" />
                      </div>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your project, custom requirements, or call targets..."
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-blue-500/40 focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                </div>

                {/* Form Nav Buttons */}
                <div className="pt-4 border-t border-white/5 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-transparent px-5 text-xs font-bold text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Change Date</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Reserving time...</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve Consultation</span>
                        <ArrowRight className="h-4.5 w-4.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-6"
            >
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                >
                  <CheckCircle className="h-8 w-8" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <h2 className="font-bricolage text-2xl font-black text-white">Discovery Call Scheduled!</h2>
                <p className="text-sm text-slate-300 max-w-[450px] mx-auto leading-relaxed">
                  {successMessage || "Your calendar appointment has been logged successfully. Sanjana or one of our leads will follow up."}
                </p>
              </div>

              {/* Visual Ticket Receipt */}
              <div className="max-w-[380px] mx-auto rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-left space-y-2.5 relative">
                <div className="absolute top-0 right-0 h-16 w-16 rounded-full bg-emerald-500/5 blur-[20px]" />
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-400">Appointment Host</span>
                  <span className="font-bold text-white">Creuto Leadership Team</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-400">Consultant Client</span>
                  <span className="font-bold text-white truncate max-w-[150px]">{name}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2 mt-2">
                  <span className="font-semibold text-slate-400">Scheduled Time</span>
                  <span className="font-bold text-emerald-400 text-right">
                    {selectedTimeSlot}
                  </span>
                </div>
                <div className="text-right text-[10px] text-slate-500 font-mono">
                  {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <Link
                  href="/"
                  className="rounded-xl border border-white/10 px-6 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  )
}
