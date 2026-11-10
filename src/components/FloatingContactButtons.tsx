import React, { useState, useEffect } from "react";
import { Phone, MessageSquare } from "lucide-react";
import {
  BUSINESS_CONFIG,
  getPhoneCallUrl,
  getWhatsAppUrl,
} from "../data/business";

export const FloatingContactButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Floating Phone Call Button */}
      <a
        href={getPhoneCallUrl()}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-gray-50 border-2 border-accent text-accent shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent active:scale-95"
        aria-label={`Call Track Automotive at ${BUSINESS_CONFIG.phone.display}`}
        title={`Call ${BUSINESS_CONFIG.phone.display}`}
      >
        <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-accent group-hover:scale-110 transition-transform" />

        {/* Floating Tooltip Label (Desktop) */}
        <span className="hidden md:group-hover:flex items-center absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap shadow-xl">
          Call {BUSINESS_CONFIG.phone.display}
        </span>
      </a>

      {/* Floating WhatsApp Action Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.7)] transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
        aria-label="Chat with Track Automotive on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        <MessageSquare className="w-5 h-5 sm:w-7 sm:h-7 fill-white text-white relative z-10" />

        {/* Floating Tooltip Label (Desktop) */}
        <span className="hidden md:group-hover:flex items-center absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap shadow-xl">
          WhatsApp Direct Chat
        </span>
      </a>
    </div>
  );
};
