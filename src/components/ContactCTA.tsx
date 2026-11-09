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
    <section className="relative py-16 sm:py-20 overflow-hidden bg-white">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

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
            <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto">
              <a
                href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to book an appointment for my car service.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg
                           bg-accent hover:bg-accent-hover text-white font-semibold text-sm
                           shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </a>
              <a
                href={getPhoneCallUrl()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg
                           bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm
                           border border-gray-200 hover:border-gray-300 transition-all duration-200 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>{BUSINESS_CONFIG.phone.display}</span>
              </a>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            />
          </div>

        </div>
      </div>
    </section>
  );
};
