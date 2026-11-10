import React, { useState } from "react";
import { Star, Quote, CheckCircle, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data/testimonials";
import { getWhatsAppUrl } from "../data/business";

export const TestimonialsSection: React.FC = () => {
  const [mobileIdx, setMobileIdx] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);

  const handleMobilePrev = () => {
    setMobileIdx((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleMobileNext = () => {
    setMobileIdx((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleMobileNext();
      } else {
        handleMobilePrev();
      }
    }
  };

  const currentMobileReview = TESTIMONIALS_DATA[mobileIdx];

  return (
    <section id="testimonials" className="py-10 sm:py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="site-container relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-accent">
              Testimonials
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold tracking-tight text-gray-900 leading-tight mb-2 sm:mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 text-xs sm:text-base">
            Real satisfaction from automotive owners who trust Track Automotive with their vehicles.
          </p>
        </div>

        {/* ============================================================
            MOBILE COMPACT CAROUSEL (md:hidden)
            Single compact card with touch swipe, arrows, and dot navigation
            ============================================================ */}
        <div className="md:hidden mb-6">
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs flex flex-col min-h-[220px] select-none"
          >
            {/* Top row: Stars & Quote */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {[...Array(currentMobileReview.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-5 h-5 text-red-200" />
            </div>

            {/* Review Comment */}
            <p className="text-gray-700 text-xs leading-relaxed mb-4 flex-1 italic">
              "{currentMobileReview.comment}"
            </p>

            {/* Author row */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 text-accent font-bold text-xs flex items-center justify-center shrink-0">
                  {currentMobileReview.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900 text-xs truncate">
                      {currentMobileReview.name}
                    </span>
                    {currentMobileReview.verified && (
                      <span className="inline-flex items-center text-[9px] text-accent font-semibold shrink-0">
                        <CheckCircle className="w-2.5 h-2.5 mr-0.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    {currentMobileReview.roleOrVehicle}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-gray-600 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 shrink-0">
                {currentMobileReview.serviceUsed}
              </span>
            </div>
          </div>

          {/* Mobile Nav Controls: Prev / Dots / Next */}
          <div className="flex items-center justify-between mt-3 px-1">
            <button
              type="button"
              onClick={handleMobilePrev}
              aria-label="Previous review"
              className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMobileIdx(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIdx === idx ? "w-4 bg-accent" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleMobileNext}
              aria-label="Next review"
              className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 shadow-xs active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ============================================================
            DESKTOP & TABLET TESTIMONIALS GRID (hidden md:grid)
            Preserves 100% of original desktop 2-column layout
            ============================================================ */}
        <div className="hidden md:grid md:grid-cols-2 gap-5 mb-10">
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
          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
            Are you an existing Track Automotive customer? Share your experience!
          </p>
          <a
            href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to share my feedback on my recent car service.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white hover:bg-gray-50
                       border border-gray-200 text-xs sm:text-sm text-gray-700 font-semibold transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-accent" />
            <span>Send Feedback on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
