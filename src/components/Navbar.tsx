import React, { useState, useEffect, useCallback } from "react";
import { Phone, Menu, X, Calendar } from "lucide-react";
import { TrackLogo } from "./TrackLogo";
import {
  BUSINESS_CONFIG,
  getPhoneCallUrl,
  getWhatsAppUrl,
} from "../data/business";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* ---- Scroll detection for sticky effect & active section spy ---- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 130) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---- Smooth scroll with luxury offset ---- */
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const navbarOffset = 90;
        const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  /* ---- Lock body scroll when mobile menu open ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const phoneUrl = getPhoneCallUrl();
  const waUrl = getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to book an appointment.");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[80px] sm:h-[88px] lg:h-[92px] flex items-center transition-all duration-300 ${scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]"
            : "bg-white border-b border-gray-100 shadow-none"
          }`}
      >
        <div className="site-container flex items-center justify-between gap-3 sm:gap-6">

          {/* LEFT — Brand Logo (Scales smoothly from small mobile 320px to large desktop) */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="shrink-0 focus-visible:outline-none transition-transform duration-200 hover:opacity-95"
            aria-label="TRACK AUTOMOTIVE Home"
          >
            <TrackLogo
              size="nav"
              priority
              className="py-1"
              imgClassName="h-[46px] xs:h-[54px] sm:h-[64px] lg:h-[68px] w-auto max-w-[125px] xs:max-w-[140px] sm:max-w-[150px]"
            />
          </a>

          {/* CENTER — Luxury Desktop Nav Links (Balanced gaps for small laptops 1024px to wide screens) */}
          <nav
            className="hidden lg:flex items-center lg:gap-5 xl:gap-7 2xl:gap-9"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`group relative py-2 text-sm xl:text-[15px] font-medium tracking-wide transition-colors duration-200 ${isActive
                      ? "text-accent font-semibold"
                      : "text-gray-700 hover:text-gray-950"
                    }`}
                >
                  <span>{link.label}</span>

                  {/* Smooth Red Underline Hover & Active Animation */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full transition-transform duration-300 ease-out origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* RIGHT — Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5">
            {/* Phone Contact Pill */}
            <a
              href={phoneUrl}
              className="inline-flex items-center gap-2 px-3.5 py-2 xl:px-4 xl:py-2.5 rounded-full
                         border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300
                         text-gray-800 text-xs xl:text-sm font-medium tracking-tight
                         shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-sm
                         transition-all duration-200 group"
              aria-label={`Call ${BUSINESS_CONFIG.phone.display}`}
            >
              <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-accent shrink-0 group-hover:bg-red-100 transition-colors">
                <Phone className="w-3 h-3 text-accent transition-transform duration-200 group-hover:scale-110" />
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {BUSINESS_CONFIG.phone.display}
              </span>
            </a>

            {/* Book Appointment CTA Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 xl:px-5 xl:py-2.5 rounded-full
                         bg-accent hover:bg-accent-hover text-white text-xs xl:text-sm font-semibold
                         shadow-sm hover:shadow-md hover:shadow-accent/25
                         hover:-translate-y-0.5 active:translate-y-0 active:scale-95
                         transition-all duration-200 group"
              aria-label="Book Appointment"
            >
              <Calendar className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              <span>Book Appointment</span>
            </a>
          </div>

          {/* MOBILE / TABLET — Direct Call Icon + Hamburger */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
            <a
              href={phoneUrl}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white
                         flex items-center justify-center text-accent hover:border-accent
                         transition-colors active:scale-95 shadow-sm"
              aria-label={`Call ${BUSINESS_CONFIG.phone.display}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-gray-200 bg-white
                         flex items-center justify-center text-gray-700 hover:text-gray-950
                         hover:border-gray-300 transition-all active:scale-95 shadow-sm"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE — Full-Screen Luxury Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white flex flex-col lg:hidden
                    transition-all duration-300 ${mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
        aria-hidden={!mobileOpen}
      >
        {/* Mobile Header */}
        <div className="h-[80px] sm:h-[88px] flex items-center justify-between px-4 sm:px-6 border-b border-gray-100">
          <TrackLogo
            size="nav"
            priority
            imgClassName="h-[46px] xs:h-[52px] w-auto max-w-[130px]"
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-gray-200 bg-white
                       flex items-center justify-center text-gray-700 hover:text-gray-950
                       hover:border-gray-300 transition-all active:scale-95 shadow-sm"
            aria-label="Close mobile menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex-1 flex flex-col px-6 pt-6 overflow-y-auto">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-200
                            border-b border-gray-50 ${isActive
                    ? "text-accent font-semibold bg-red-50/50"
                    : "text-gray-800 hover:text-gray-950 hover:bg-gray-50"
                  }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Action Buttons */}
        <div className="flex flex-col gap-3 px-6 py-6 border-t border-gray-100 bg-gray-50/50">
          <a
            href={phoneUrl}
            className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full
                       bg-white border border-gray-200 text-gray-800 font-semibold text-sm
                       hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-accent shrink-0">
              <Phone className="w-3 h-3 text-accent" />
            </div>
            <span>{BUSINESS_CONFIG.phone.display}</span>
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-full
                       bg-accent hover:bg-accent-hover text-white font-semibold text-sm
                       shadow-sm hover:shadow-md transition-all active:scale-95"
            onClick={() => setMobileOpen(false)}
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
