import React from "react";
import { Phone, MessageSquare, Check, Car, Clock, Award, Wrench } from "lucide-react";
import { getPhoneCallUrl, getWhatsAppUrl } from "../data/business";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop";

const FEATURES = [
  "OEM Grade Parts",
  "Transparent Estimates",
  "Precision Diagnostics",
  "Dedicated Customer Care",
];

const STATS_CARDS = [
  { icon: <Car className="w-5 h-5 text-accent" />, value: "2,500+", label: "Cars Detailed" },
  { icon: <Clock className="w-5 h-5 text-accent" />, value: "5+", label: "Years Experience" },
  { icon: <Award className="w-5 h-5 text-accent" />, value: "1,000+", label: "Happy Customers" },
  { icon: <Wrench className="w-5 h-5 text-accent" />, value: "15+", label: "Premium Services" },
];

const MISSION_VISION = [
  {
    label: "Our Mission",
    text: "Deliver reliable, transparent care using industry-leading tools and long-term expertise for your vehicle.",
  },
  {
    label: "Our Vision",
    text: "To be the most trusted and professional detailing brand trusted by customers.",
  },
];

export const AboutSection: React.FC = () => {
  const phoneUrl = getPhoneCallUrl();
  const waUrl = getWhatsAppUrl(
    "Hello TRACK AUTOMOTIVE, I visited your website and would like to enquire about your services."
  );

  return (
    <section
      id="about"
      className="bg-white py-10 sm:py-14 lg:py-24 overflow-hidden"
      aria-label="About Track Automotive"
    >
      <div className="site-container">
        {/* ============================================================
            DESKTOP LAYOUT (lg:grid) — Preserves 100% of original desktop
            ============================================================ */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT — Workshop Image & Stats */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-md">
              <img
                src={ABOUT_IMAGE}
                alt="Track Automotive Workshop"
                className="w-full h-[480px] object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Stats grid below image */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {STATS_CARDS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-lg font-heading font-bold text-gray-900 leading-none">{stat.value}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Content */}
          <div>
            {/* Section label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                About Us
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-gray-900 leading-tight mb-2">
              Passion for Cars.{" "}
              <span className="text-accent">Precision in Care.</span>
            </h2>

            {/* Red divider */}
            <div className="w-12 h-0.5 bg-accent mb-5" />

            {/* Body */}
            <p className="text-gray-500 leading-relaxed mb-5 text-sm sm:text-base">
              At <strong className="text-gray-800">TRACK AUTOMOTIVE</strong>, we believe every car deserves
              the same meticulous attention a racing team gives its competition machine.
              Our AutoGloss-standard detailing shop focuses on quality, protection and
              long-term care for your vehicle.
            </p>

            {/* Mission / Vision */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {MISSION_VISION.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Feature pills */}
            <div className="grid grid-cols-2 gap-2 mb-7">
              {FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg
                             bg-white border border-gray-100 shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-gray-700 text-xs font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3">
              <a
                href={phoneUrl}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg
                           bg-gray-50 hover:bg-gray-100 border border-gray-200
                           text-gray-800 font-semibold text-sm transition-all duration-200"
                aria-label="Call the workshop"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>Call Workshop</span>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg
                           bg-accent hover:bg-accent-hover text-white font-semibold text-sm
                           shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="Enquire on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================
            MOBILE & TABLET LAYOUT (lg:hidden) — Engineered for small screens
            Flow: Image FIRST -> Heading & Text -> Mission/Vision -> Stats 2-Col -> Features -> CTAs
            ============================================================ */}
        <div className="lg:hidden flex flex-col gap-4 sm:gap-6">
          {/* 1. ABOUT US IMAGE FIRST — Compact aspect ratio */}
          <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <img
              src={ABOUT_IMAGE}
              alt="Track Automotive Workshop"
              className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover object-center"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop";
              }}
            />
          </div>

          {/* 2. HEADING & DESCRIPTION IMMEDIATELY BELOW IMAGE */}
          <div>
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                About Us
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-gray-900 leading-tight mb-2">
              Passion for Cars.{" "}
              <span className="text-accent">Precision in Care.</span>
            </h2>

            <div className="w-10 h-0.5 bg-accent mb-3" />

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
              At <strong className="text-gray-900 font-semibold">TRACK AUTOMOTIVE</strong>, we believe every car deserves
              the same meticulous attention a racing team gives its competition machine.
              Our AutoGloss-standard detailing shop focuses on quality, protection and
              long-term care for your vehicle.
            </p>
          </div>

          {/* 3. MISSION & VISION COMPACT CARDS */}
          <div className="grid grid-cols-2 gap-2.5">
            {MISSION_VISION.map((item, i) => (
              <div key={i} className="bg-gray-50/80 rounded-xl border border-gray-100 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">
                  {item.label}
                </p>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* 4. STATISTICS IN A 2-COLUMN GRID */}
          <div className="grid grid-cols-2 gap-2.5">
            {STATS_CARDS.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-xs p-2.5 sm:p-3 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  {React.cloneElement(stat.icon as React.ReactElement, {
                    className: "w-4 h-4 text-accent",
                  })}
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-heading font-bold text-gray-900 leading-tight truncate">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium truncate mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 5. FEATURE PILLS (2-Column Compact Grid) */}
          <div className="grid grid-cols-2 gap-2">
            {FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-gray-50/60 border border-gray-100"
              >
                <div className="w-4 h-4 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-accent" />
                </div>
                <span className="text-gray-700 text-[11px] sm:text-xs font-medium truncate">{feature}</span>
              </div>
            ))}
          </div>

          {/* 6. CTA BUTTONS */}
          <div className="flex flex-col xs:flex-row gap-2.5 pt-1">
            <a
              href={phoneUrl}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                         bg-gray-50 hover:bg-gray-100 border border-gray-200
                         text-gray-800 font-semibold text-xs transition-all duration-200 active:scale-[0.98]"
              aria-label="Call the workshop"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Call Workshop</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                         bg-accent hover:bg-accent-hover text-white font-semibold text-xs
                         shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              aria-label="Enquire on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
