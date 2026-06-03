"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code, Smartphone, Globe, Cloud, Brain, Rocket,
  ArrowRight, ArrowUpRight, Calendar, HelpCircle,
} from "lucide-react"
import { SERVICES_MENU_DATA } from "@/constants/servicesMenuData"

// Map icon names to actual components to avoid importing all of lucide
const ICON_MAP: Record<string, React.ElementType> = {
  Code, Smartphone, Globe, Cloud, Brain, Rocket, HelpCircle,
}

const CategoryIcon = ({ iconName, className }: { iconName: string; className: string }) => {
  const IconComponent = ICON_MAP[iconName] || HelpCircle
  return <IconComponent className={className} size={20} strokeWidth={2} />
}

export default function ServicesMegaMenu() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SERVICES_MENU_DATA[0].id)
  const activeCategory = SERVICES_MENU_DATA.find((c) => c.id === activeCategoryId) || SERVICES_MENU_DATA[0]

  return (
    /* Fixed overlay that centers on viewport — 128px = 48px banner + 80px nav */
    <div
      className="fixed left-0 right-0 z-[100] flex justify-center px-4"
      style={{ top: "128px" }}
    >
      {/* Invisible bridge above the panel to prevent flickering on mouse travel */}
      <div className="absolute -top-3 left-0 right-0 h-4" />

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1080px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] flex"
      >
        {/* ─── LEFT COLUMN — Category List ─── */}
        <div className="w-[290px] shrink-0 bg-[#f8f9fb] py-5 px-4 border-r border-slate-100 flex flex-col gap-0.5">
          {SERVICES_MENU_DATA.map((category) => {
            const isActive = category.id === activeCategoryId
            return (
              <div
                key={category.id}
                onMouseEnter={() => setActiveCategoryId(category.id)}
                className={`group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                  isActive
                    ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-200/60"
                    : "border border-transparent hover:bg-white/60"
                }`}
              >
                {/* Colored Icon Badge */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isActive
                      ? category.bgColor
                      : "bg-slate-100 group-hover:bg-white"
                  }`}
                >
                  <CategoryIcon
                    iconName={category.iconName}
                    className={`transition-colors duration-200 ${
                      isActive ? category.iconColor : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`font-jakarta text-[14px] font-semibold leading-tight transition-colors duration-200 ${
                    isActive ? "text-[#2563eb]" : "text-[#374151] group-hover:text-[#111827]"
                  }`}
                >
                  {category.name}
                </span>
              </div>
            )
          })}
        </div>

        {/* ─── CENTER COLUMN — Sub-services ─── */}
        <div className="flex-1 min-w-0 py-7 px-8 flex flex-col">
          {/* Category Heading */}
          <div className="mb-5 border-b border-slate-100 pb-5">
            <h3 className="font-jakarta text-[18px] font-bold text-[#111827] mb-1">
              {activeCategory.name}
            </h3>
            <p className="font-jakarta text-[13.5px] text-[#6B7280] leading-relaxed max-w-lg">
              {activeCategory.description}
            </p>
          </div>

          {/* Sub-services Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="grid grid-cols-2 gap-x-8 gap-y-4"
            >
              {activeCategory.subServices.map((sub, index) => (
                <Link
                  key={`${sub.slug}-${index}`}
                  href={`/services/${sub.slug}`}
                  className="group flex items-center gap-2"
                >
                  <ArrowRight
                    size={14}
                    className="text-slate-300 shrink-0 transition-all duration-200 group-hover:text-[#2563eb] group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                  <span className="font-jakarta text-[14px] font-medium text-[#374151] transition-colors duration-200 group-hover:text-[#2563eb]">
                    {sub.name}
                  </span>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── RIGHT COLUMN — Book A Call CTA ─── */}
        <div className="w-[250px] shrink-0 p-4 flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/[0.06] rounded-full blur-2xl -mr-8 -mt-8" />

            <div>
              {/* Icon Badge */}
              <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/10">
                <Calendar size={17} className="text-white" />
              </div>

              <h4 className="font-jakarta text-[16px] font-bold mb-2 leading-snug text-white">
                Start a New Project
              </h4>
              <p className="font-jakarta text-[12.5px] text-white/75 leading-relaxed">
                Discuss your product idea with our engineering leadership team to find the best approach.
              </p>
            </div>

            {/* Profile + Button */}
            <div className="mt-5">
              <div className="flex items-center gap-2.5 mb-4 border-t border-white/10 pt-4">
                <img
                  src="/img/leadership/sanjana.webp"
                  alt="Sanjana - Product Manager"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
                  }}
                />
                <div>
                  <p className="font-jakarta text-[13px] font-bold leading-none text-white mb-0.5">Sanjana</p>
                  <p className="font-jakarta text-[11px] text-white/55 leading-none">Product Manager</p>
                </div>
              </div>

              <Link
                href="/book-a-call"
                className="w-full bg-white/95 backdrop-blur-sm text-[#2563eb] py-2.5 px-4 rounded-xl font-jakarta text-[13.5px] font-bold flex items-center justify-center gap-1.5 transition-all duration-200 hover:bg-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book a Call</span>
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
