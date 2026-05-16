"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const dismissed = sessionStorage.getItem("announcement_dismissed");
    if (!dismissed) {
      setIsVisible(true);
      document.documentElement.style.setProperty("--announcement-height", "40px");
    }
    
    return () => {
      document.documentElement.style.removeProperty("--announcement-height");
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement_dismissed", "true");
    document.documentElement.style.setProperty("--announcement-height", "0px");
  };

  if (!isClient || !isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 h-[40px] bg-gradient-to-r from-[#1746ea] to-[#1d4ed8] z-[60] flex items-center justify-center px-[5%]"
    >
      <div className="flex-1 flex justify-center items-center gap-[6px]">
        <span className="text-[14px]">🔥</span>
        <span className="font-bricolage text-[13px] font-semibold text-white tracking-[0.01em]">
          Build your dream software — talk to our experts today!
        </span>
      </div>
      <button 
        onClick={handleDismiss}
        className="absolute right-[5%] flex items-center justify-center p-[4px] hover:bg-white/10 rounded-full transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={16} className="text-white" />
      </button>
    </motion.div>
  );
}
