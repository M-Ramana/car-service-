import React from "react";
import { Star, Quote, CheckCircle, MessageSquare } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data/testimonials";
import { getWhatsAppUrl } from "../data/business";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="site-container relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-gray-900 leading-tight mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Real satisfaction from automotive owners who trust Track Automotive with their vehicles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-7 h-7 text-red-100 mb-3" />

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                "{item.comment}"
              </p>

              {/* Author & Service Badge */}
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-600">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </span>
                      {item.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-accent font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.roleOrVehicle}</p>
                  </div>
                </div>

                <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                  {item.serviceUsed}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">
            Are you an existing Track Automotive customer? Share your experience!
          </p>
          <a
            href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to share my feedback on my recent car service.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-gray-50
                       border border-gray-200 text-sm text-gray-600 font-semibold transition-colors shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-accent" />
            Send Feedback on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
