import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORIES,
  GalleryItem,
} from "../data/gallery";
import { getGalleryWhatsAppUrl, getWhatsAppUrl } from "../data/business";

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Reset mobile index when category changes
  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    setMobileIndex(0);
  };

  const currentLightboxItem: GalleryItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] || null : null;

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : (prev as number) - 1
      );
    }
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === filteredItems.length - 1 ? 0 : (prev as number) + 1
      );
    }
  }, [lightboxIndex, filteredItems.length]);

  // Mobile carousel navigation
  const handleMobilePrev = () => {
    setMobileIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  // Mobile touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsSwiping(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    setIsSwiping(false);
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    // Only swipe if horizontal movement exceeds vertical and is > 40px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleMobileNext();
      } else {
        handleMobilePrev();
      }
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <section id="gallery" className="py-10 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="site-container relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-accent">
                Our Work
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight">
              Work Gallery
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
            {/* Mobile Carousel Arrow Controls (Visible only on mobile) */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={handleMobilePrev}
                aria-label="Previous gallery image"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-xs active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-semibold text-gray-500 px-1">
                {mobileIndex + 1} / {filteredItems.length}
              </span>
              <button
                type="button"
                onClick={handleMobileNext}
                aria-label="Next gallery image"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-xs active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I viewed your gallery and would like to enquire about car care services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-accent hover:text-accent-hover shrink-0"
            >
              <span>Inquire Work</span> <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal scroll on mobile, flex wrap on desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? "bg-accent text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ============================================================
            MOBILE COMPACT CAROUSEL (sm:hidden)
            Touch-swipable single card with consistent 4:3 ratio & indicators
            ============================================================ */}
        <div className="sm:hidden w-full">
          {filteredItems.length > 0 && (
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={() => setLightboxIndex(mobileIndex)}
              className="group relative rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm cursor-pointer select-none"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={filteredItems[mobileIndex].image}
                  alt={filteredItems[mobileIndex].title}
                  className="w-full h-full object-cover object-center pointer-events-none"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                {/* Tag Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-gray-800 shadow-xs backdrop-blur-sm">
                    {filteredItems[mobileIndex].tag}
                  </span>
                </div>

                {/* Tap to expand hint */}
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/50 text-white backdrop-blur-sm flex items-center gap-1 text-[10px]">
                  <Maximize2 className="w-3 h-3" />
                  <span>Tap to expand</span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-3.5 bg-white flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-gray-900 font-heading font-semibold text-sm truncate">
                    {filteredItems[mobileIndex].title}
                  </h4>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">
                    {filteredItems[mobileIndex].vehicle}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-bold text-accent bg-red-50 border border-red-100 px-2 py-1 rounded shrink-0">
                  {filteredItems[mobileIndex].categoryLabel}
                </span>
              </div>
            </div>
          )}

          {/* Mobile Dot Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {filteredItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMobileIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  mobileIndex === idx ? "w-5 bg-accent" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ============================================================
            DESKTOP & TABLET GALLERY GRID (hidden sm:grid)
            Preserves 100% of original desktop 2/4-column responsive grid
            ============================================================ */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-xl overflow-hidden bg-gray-100 border border-gray-100
                         shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tag Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                                   bg-white/90 text-gray-800 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/80 text-gray-600
                                opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom overlay text on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h4 className="text-white font-semibold text-xs line-clamp-1">{item.title}</h4>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 bg-white">
                <h4 className="text-gray-800 font-semibold text-xs line-clamp-1 mb-0.5 group-hover:text-accent transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-[11px]">{item.vehicle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal — Optimized with Mobile Safe Padding & Responsiveness */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/15 border border-white/20 text-white hover:text-accent hover:bg-white/25 transition-colors z-50 focus:outline-none"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/10 border border-white/20 text-white hover:text-accent transition-colors z-50 flex items-center justify-center"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/10 border border-white/20 text-white hover:text-accent transition-colors z-50 flex items-center justify-center"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]"
          >
            <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center max-h-[50vh] sm:max-h-[65vh]">
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="w-full h-full object-contain max-h-[50vh] sm:max-h-[65vh]"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-5 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-accent text-white">
                    {currentLightboxItem.categoryLabel}
                  </span>
                  <span className="text-xs text-gray-500">
                    {currentLightboxItem.vehicle}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-bold text-gray-900 truncate">{currentLightboxItem.title}</h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 max-w-xl line-clamp-2">{currentLightboxItem.description}</p>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <a
                  href={getGalleryWhatsAppUrl(currentLightboxItem.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg
                             bg-accent hover:bg-accent-hover text-white text-xs sm:text-sm font-semibold shadow-xs sm:shadow-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Inquire This Build</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
