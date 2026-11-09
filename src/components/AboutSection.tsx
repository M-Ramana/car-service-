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
      className="bg-white py-20 lg:py-24 overflow-hidden"
      aria-label="About Track Automotive"
    >
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — Workshop Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-md">
              <img
                src={ABOUT_IMAGE}
                alt="Track Automotive Workshop"
                className="w-full h-[260px] sm:h-[380px] lg:h-[480px] object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Stats grid below image */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 mt-4">
              {STATS_CARDS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-heading font-bold text-gray-900 leading-none">{stat.value}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-7">
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
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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
      </div>
    </section>
  );
};

export default AboutSection;
