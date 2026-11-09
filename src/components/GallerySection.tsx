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

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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
    <section id="gallery" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="site-container relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Our Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight">
              Work Gallery
            </h2>
          </div>
          <a
            href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I viewed your gallery and would like to enquire about car care services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover shrink-0 self-start sm:self-auto"
          >
            <span>Inquire Work</span> <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-accent text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:text-accent hover:bg-white/20 transition-colors z-50 focus:outline-none"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:text-accent transition-colors z-50 hidden sm:flex items-center justify-center"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:text-accent transition-colors z-50 hidden sm:flex items-center justify-center"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center max-h-[65vh]">
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-accent text-white">
                    {currentLightboxItem.categoryLabel}
                  </span>
                  <span className="text-xs text-gray-500">
                    {currentLightboxItem.vehicle}
                  </span>
                </div>
                <h3 className="text-base font-heading font-bold text-gray-900">{currentLightboxItem.title}</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xl">{currentLightboxItem.description}</p>
              </div>

              <div className="shrink-0">
                <a
                  href={getGalleryWhatsAppUrl(currentLightboxItem.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg
                             bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Inquire This Build
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
