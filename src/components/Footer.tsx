import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  ArrowUp,
  X,
  ShieldCheck,
  Youtube,
  Navigation,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { TrackLogo } from "./TrackLogo";
import {
  BUSINESS_CONFIG,
  getPhoneCallUrl,
  getServiceWhatsAppUrl,
} from "../data/business";
import { SERVICES_DATA } from "../data/services";

const NAV_LINKS = [
  { label: "Home",         href: "#home" },
  { label: "Services",     href: "#services" },
  { label: "About",        href: "#about" },
  { label: "Gallery",      href: "#gallery" },
  { label: "Reviews",      href: "#testimonials" },
];

export const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [mobileQuickLinksOpen, setMobileQuickLinksOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#101010] text-[#E5E5E5] border-t border-[#303030] relative z-10 pt-10 pb-6 sm:pt-16 sm:pb-8">
      <div className="site-container">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-8 sm:mb-12">

          {/* Column 1 (3 cols): Logo, Narrative & Social */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <div className="pb-0.5">
              <TrackLogo size="lg" />
            </div>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed max-w-xs font-normal">
              <strong className="text-[#FFFFFF] font-semibold">TRACK AUTOMOTIVE</strong> is a premier
              multi-brand automobile service, repair, and detailing workshop dedicated to precision
              engineering and uncompromised performance.
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <a
                href={BUSINESS_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-[#181818] hover:bg-[#202020] text-[#A3A3A3] hover:text-[#ED1C24]
                           border border-[#303030] hover:border-[#ED1C24]/50 transition-all duration-200 group"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={BUSINESS_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-[#181818] hover:bg-[#202020] text-[#A3A3A3] hover:text-[#ED1C24]
                           border border-[#303030] hover:border-[#ED1C24]/50 transition-all duration-200 group"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-[#181818] hover:bg-[#202020] text-[#A3A3A3] hover:text-[#ED1C24]
                           border border-[#303030] hover:border-[#ED1C24]/50 transition-all duration-200 group"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Column 2 (2 cols): Quick Links (Collapsible Accordion on Mobile, Always Open on Desktop) */}
          <div className="lg:col-span-2 space-y-2 sm:space-y-3 border-t md:border-t-0 border-[#242424] pt-4 md:pt-0">
            {/* Header / Toggle button */}
            <button
              type="button"
              onClick={() => setMobileQuickLinksOpen(!mobileQuickLinksOpen)}
              className="w-full flex items-center justify-between text-left md:pointer-events-none pb-1.5 md:pb-2.5 border-b border-[#303030]"
            >
              <h4 className="text-xs font-heading font-semibold text-[#FFFFFF] uppercase tracking-widest">
                Quick Links
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 md:hidden transition-transform duration-200 ${
                  mobileQuickLinksOpen ? "rotate-180 text-accent" : ""
                }`}
              />
            </button>

            {/* Links list */}
            <ul className={`space-y-2 text-xs sm:text-sm font-medium pt-1 ${
              mobileQuickLinksOpen ? "block" : "hidden md:block"
            }`}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-[#A3A3A3] hover:text-[#ED1C24] transition-all duration-200 inline-block hover:translate-x-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (3 cols): Our Services (Collapsible Accordion on Mobile, Always Open on Desktop) */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-3 border-t md:border-t-0 border-[#242424] pt-4 md:pt-0">
            {/* Header / Toggle button */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between text-left md:pointer-events-none pb-1.5 md:pb-2.5 border-b border-[#303030]"
            >
              <h4 className="text-xs font-heading font-semibold text-[#FFFFFF] uppercase tracking-widest">
                Our Services
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 md:hidden transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180 text-accent" : ""
                }`}
              />
            </button>

            {/* Services list */}
            <ul className={`space-y-2 text-xs sm:text-sm font-medium pt-1 ${
              mobileServicesOpen ? "block" : "hidden md:block"
            }`}>
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href={getServiceWhatsAppUrl(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A3A3A3] hover:text-[#ED1C24] transition-all duration-200 flex items-center justify-between group py-0.5 hover:translate-x-0.5"
                  >
                    <span className="truncate">{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (4 cols): Contact Information, Workshop Address & Map Preview */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4 border-t md:border-t-0 border-[#242424] pt-4 md:pt-0">
            <h4 className="text-xs font-heading font-semibold text-[#FFFFFF] uppercase tracking-widest border-b border-[#303030] pb-2 sm:pb-2.5">
              Contact & Location
            </h4>

            {/* Direct Contact Details */}
            <div className="space-y-2.5 text-xs sm:text-sm font-normal">
              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ED1C24] shrink-0" />
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#A3A3A3] block leading-tight">Phone</span>
                  <a
                    href={getPhoneCallUrl()}
                    className="text-[#E5E5E5] hover:text-[#ED1C24] font-medium transition-colors"
                  >
                    {BUSINESS_CONFIG.phone.display}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ED1C24] shrink-0" />
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#A3A3A3] block leading-tight">Email</span>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="text-[#E5E5E5] hover:text-[#ED1C24] font-medium transition-colors"
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Workshop Address */}
              <div className="flex items-start gap-2.5 pt-0.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ED1C24] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#A3A3A3] block leading-tight">Workshop Address</span>
                  <address className="not-italic text-[#A3A3A3] leading-relaxed text-[11px] sm:text-xs mt-0.5">
                    {BUSINESS_CONFIG.address.street}, {BUSINESS_CONFIG.address.area}, {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state} - {BUSINESS_CONFIG.address.pincode}
                  </address>
                </div>
              </div>
            </div>

            {/* Google Maps Preview */}
            <div className="pt-1">
              <div className="w-full sm:w-[220px] max-w-full h-[110px] sm:h-[130px] rounded-xl overflow-hidden border border-[#303030] shadow-md relative bg-[#181818]">
                <iframe
                  title="Track Automotive Workshop Location"
                  src={BUSINESS_CONFIG.map.embedUrl}
                  className="w-full h-full border-0 pointer-events-auto"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* View on Google Maps Link */}
              <a
                href={BUSINESS_CONFIG.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#ED1C24] hover:text-white transition-colors group"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-5 sm:pt-6 border-t border-[#303030] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#A3A3A3]">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 text-center sm:text-left">
            <p className="font-normal text-[11px] sm:text-xs">© 2026 TRACK AUTOMOTIVE. All Rights Reserved.</p>
            <span className="hidden sm:inline text-[#303030]">•</span>
            <button
              type="button"
              onClick={() => setShowPrivacy(true)}
              className="hover:text-[#FFFFFF] transition-colors underline underline-offset-4 font-normal text-[11px] sm:text-xs"
            >
              Privacy Policy
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <span className="text-[#A3A3A3] text-[11px] sm:text-xs">
              <a href={getPhoneCallUrl()} className="text-[#E5E5E5] hover:text-[#ED1C24] font-medium transition-colors">
                {BUSINESS_CONFIG.phone.display}
              </a>
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#202020]
                         text-[#A3A3A3] hover:text-[#FFFFFF] border border-[#303030] hover:border-[#ED1C24]/50 transition-colors font-medium text-[11px] sm:text-xs"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#ED1C24]" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowPrivacy(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-[#141414] rounded-2xl border border-[#303030] p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setShowPrivacy(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#1f1f1f] text-[#A3A3A3] hover:text-[#FFFFFF] border border-[#303030] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[#ED1C24]/10 text-[#ED1C24] border border-[#ED1C24]/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#FFFFFF]">
                Direct Communication & Privacy Policy
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                <strong className="text-[#FFFFFF]">TRACK AUTOMOTIVE</strong> respects customer privacy
                and operates strictly on direct telephone and official WhatsApp Business communication.
              </p>
              <p>
                <strong className="text-[#FFFFFF]">1. No Third-Party Data Tracking:</strong> We do not
                operate online user registration systems, tracking pixels, or third-party advertising
                cookies.
              </p>
              <p>
                <strong className="text-[#FFFFFF]">2. Direct Inquiries:</strong> Any communication
                initiated by clicking "Call Now" or "WhatsApp" connects directly between your personal
                device and Track Automotive's official workshop line ({BUSINESS_CONFIG.phone.display}).
              </p>
              <p>
                <strong className="text-[#FFFFFF]">3. Estimates & Media:</strong> Vehicle inspection
                photos, invoices, and diagnostic summaries shared over WhatsApp are solely for vehicle
                maintenance purposes.
              </p>
              <p className="pt-2 text-[#737373] text-xs">
                Last updated: 2026. Official website of Track Automotive, Nagercoil, Tamil Nadu.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
