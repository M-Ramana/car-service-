import React from "react";
import { Phone, Calendar } from "lucide-react";
import {
  BUSINESS_CONFIG,
  getPhoneCallUrl,
  getWhatsAppUrl,
} from "../data/business";

const BOOKING_IMAGE =
  "https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=800&auto=format&fit=crop";

export const ContactCTA: React.FC = () => {
  return (
    <section className="relative py-10 sm:py-16 lg:py-20 overflow-hidden bg-white">
      <div className="site-container">
        {/* ============================================================
            DESKTOP LAYOUT (hidden lg:grid) — Preserves 100% of original desktop
            ============================================================ */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT — Content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Book Now
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Schedule Your <span className="text-accent">Car Service</span>
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
              Set your car care it deserves in just a few steps. Book an appointment with{" "}
              <strong className="text-gray-800">TRACK AUTOMOTIVE</strong> quickly and simply.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-row gap-3 mb-6">
              <a
                href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to book an appointment for my car service.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg
                           bg-accent hover:bg-accent-hover text-white font-semibold text-sm
                           shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </a>
              <a
                href={getPhoneCallUrl()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg
                           bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm
                           border border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>{BUSINESS_CONFIG.phone.display}</span>
              </a>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Working Hours</p>
                <p className="text-sm font-bold text-gray-900">{BUSINESS_CONFIG.workingHours.days}</p>
                <p className="text-xs text-gray-500">{BUSINESS_CONFIG.workingHours.hours}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Us</p>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="text-sm font-bold text-accent hover:text-accent-hover transition-colors"
                >
                  {BUSINESS_CONFIG.email}
                </a>
                <p className="text-xs text-gray-500 mt-0.5">We respond within hours</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Car Image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[80%] rounded-full bg-red-50 blur-3xl opacity-50" />
            </div>
            <img
              src={BOOKING_IMAGE}
              alt="Book your car service"
              className="relative w-full max-w-lg h-auto object-contain drop-shadow-xl animate-float rounded-2xl"
              loading="lazy"
              style={{ maxHeight: "380px" }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop";
              }}
            />
          </div>
        </div>

        {/* ============================================================
            MOBILE & TABLET LAYOUT (lg:hidden) — Engineered for Compact Ergonomics
            Flow: Heading & Eyebrow -> Compact Car Visual -> Description -> CTAs -> 2-Col Info Cards
            ============================================================ */}
        <div className="lg:hidden flex flex-col gap-3.5">
          {/* Eyebrow & Heading */}
          <div>
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                Book Now
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-gray-900 leading-tight">
              Schedule Your <span className="text-accent">Car Service</span>
            </h2>
          </div>

          {/* Compact Car Visual without massive blank space */}
          <div className="relative flex items-center justify-center py-1">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-3/4 rounded-full bg-red-50 blur-2xl opacity-60" />
            </div>
            <img
              src={BOOKING_IMAGE}
              alt="Book car service"
              className="relative w-auto max-h-[175px] xs:max-h-[210px] object-contain drop-shadow-md rounded-xl"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop";
              }}
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Give your car the care it deserves in just a few steps. Book an appointment with{" "}
            <strong className="text-gray-900 font-semibold">TRACK AUTOMOTIVE</strong> quickly and simply.
          </p>

          {/* Compact Action Buttons */}
          <div className="flex flex-col xs:flex-row gap-2.5 pt-1">
            <a
              href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to book an appointment for my car service.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                         bg-accent hover:bg-accent-hover text-white font-semibold text-xs
                         shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book Appointment</span>
            </a>
            <a
              href={getPhoneCallUrl()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                         bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs
                         border border-gray-200 shadow-xs transition-all duration-200 active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>{BUSINESS_CONFIG.phone.display}</span>
            </a>
          </div>

          {/* 2-Column Compact Working Hours & Contact Info */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <div className="p-3 rounded-xl bg-gray-50/80 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Working Hours</p>
              <p className="text-xs font-bold text-gray-900 leading-tight">{BUSINESS_CONFIG.workingHours.days}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{BUSINESS_CONFIG.workingHours.hours}</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50/80 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Direct Email</p>
              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                className="text-xs font-bold text-accent hover:text-accent-hover transition-colors truncate block"
              >
                {BUSINESS_CONFIG.email}
              </a>
              <p className="text-[10px] text-gray-400 mt-0.5">Fast response</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
