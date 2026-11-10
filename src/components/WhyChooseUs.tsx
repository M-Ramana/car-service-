import React from "react";
import {
  Wrench,
  ShieldCheck,
  Headphones,
  Heart,
  Phone,
  MessageSquare,
} from "lucide-react";
import { getPhoneCallUrl, getWhatsAppUrl } from "../data/business";

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BENEFITS: BenefitItem[] = [
  {
    icon: <Wrench className="w-5 h-5 text-accent" />,
    title: "Expert Professionals",
    description:
      "Trained and experienced technicians using industry-leading tools and durable products.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-accent" />,
    title: "Premium Products",
    description:
      "Industry-leading safe and durable products for outstanding results every time.",
  },
  {
    icon: <Headphones className="w-5 h-5 text-accent" />,
    title: "Advanced Technology",
    description:
      "Modern tools for precision and better results. We use the best in the business.",
  },
  {
    icon: <Heart className="w-5 h-5 text-accent" />,
    title: "Customer Satisfaction",
    description:
      "Quality service that customers truly love. We go above and beyond for every vehicle.",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-10 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="site-container relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-accent">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold tracking-tight text-gray-900 leading-tight mb-2 sm:mb-3">
            The AutoGloss Advantage
          </h2>
          <p className="text-gray-500 text-xs sm:text-base">
            Engineering excellence, uncompromising standards, and a customer-first philosophy in everything we do.
          </p>
        </div>

        {/* 4 Benefits Grid — 2x2 on Mobile, 4 Cols on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-8 sm:mb-12">
          {BENEFITS.map((item, index) => (
            <div
              key={index}
              className="group p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100
                         shadow-xs sm:shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-2.5 sm:mb-4
                              group-hover:bg-accent group-hover:border-accent transition-all duration-300 shrink-0">
                <div className="group-hover:[&>svg]:text-white transition-all">
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: "w-4 h-4 sm:w-5 sm:h-5 text-accent",
                  })}
                </div>
              </div>

              <h3 className="text-xs sm:text-base font-heading font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-500 leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 p-2.5 sm:p-2 rounded-xl sm:rounded-full bg-gray-50 border border-gray-100 shadow-xs sm:shadow-sm w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-gray-700 px-2 sm:px-4 font-medium text-center">
              Ready to experience precision car care?
            </span>
            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <a
                href={getPhoneCallUrl()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white hover:bg-gray-100
                           text-gray-700 hover:text-gray-900 text-xs font-semibold border border-gray-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>Call Us</span>
              </a>
              <a
                href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to know more about your workshop services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent hover:bg-accent-hover
                           text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
