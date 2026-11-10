import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowRight, MessageSquare, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import {
  SERVICES_DATA,
  SERVICES_CATEGORIES,
} from "../data/services";
import {
  getPhoneCallUrl,
  getWhatsAppUrl,
  getServiceWhatsAppUrl,
} from "../data/business";

const CLONE_COUNT = 4; // Buffer clone items for seamless 4-card infinite display
const GAP_PX = 20; // 20px gap between cards (equivalent to gap-5)

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [enableTransition, setEnableTransition] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(4);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragDeltaRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const hasDraggedRef = useRef<boolean>(false);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filtered raw services
  const filteredServices = useMemo(() => {
    return activeCategory === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Ensure minimum items for continuous smooth infinite scrolling
  const baseItems = useMemo(() => {
    if (filteredServices.length === 0) return [];
    if (filteredServices.length < 8) {
      const repeatCount = Math.ceil(8 / filteredServices.length);
      const repeated: typeof filteredServices = [];
      for (let i = 0; i < repeatCount; i++) {
        repeated.push(...filteredServices);
      }
      return repeated;
    }
    return filteredServices;
  }, [filteredServices]);

  // Slides array with clones on both sides for infinite loop
  const slides = useMemo(() => {
    if (baseItems.length === 0) return [];
    const prefix = baseItems.slice(-CLONE_COUNT).map((item, i) => ({
      ...item,
      uniqueKey: `prefix-${item.id}-${i}`,
    }));
    const main = baseItems.map((item, i) => ({
      ...item,
      uniqueKey: `main-${item.id}-${i}`,
    }));
    const suffix = baseItems.slice(0, CLONE_COUNT).map((item, i) => ({
      ...item,
      uniqueKey: `suffix-${item.id}-${i}`,
    }));
    return [...prefix, ...main, ...suffix];
  }, [baseItems]);

  // Measure container dimensions & responsive cards to show
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      setContainerWidth(width);
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Compute exact card width and step size
  const cardWidth = useMemo(() => {
    if (containerWidth <= 0) return 280;
    return (containerWidth - (visibleCards - 1) * GAP_PX) / visibleCards;
  }, [containerWidth, visibleCards]);

  const stepSize = cardWidth + GAP_PX;

  // Re-enable transition after reset via double requestAnimationFrame
  useEffect(() => {
    if (!enableTransition) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setEnableTransition(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [enableTransition]);

  // Start transition helper with fallback guard
  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    setEnableTransition(true);

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 750);
  }, []);

  // Navigation handlers
  const slideNext = useCallback(() => {
    if (isTransitioning || baseItems.length === 0) return;
    startTransition();
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning, baseItems.length, startTransition]);

  const slidePrev = useCallback(() => {
    if (isTransitioning || baseItems.length === 0) return;
    startTransition();
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning, baseItems.length, startTransition]);

  const goToSlide = useCallback((targetIndex: number) => {
    if (isTransitioning) return;
    startTransition();
    setCurrentIndex(targetIndex);
  }, [isTransitioning, startTransition]);

  // Handle transition end & invisible loop reset
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    setIsTransitioning(false);

    if (currentIndex >= baseItems.length) {
      setEnableTransition(false);
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setEnableTransition(false);
      setCurrentIndex(baseItems.length - 1);
    }
  };

  // Browser tab visibility handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Autoplay timer: approximately 3 seconds per card
  useEffect(() => {
    if (isHovered || !isTabVisible || isDragging || baseItems.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      slideNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, isTabVisible, isDragging, baseItems.length, slideNext]);

  // Cleanup safety timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Category switch handler
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
    setCurrentIndex(0);
    setEnableTransition(false);
    setIsTransitioning(false);
    setDragOffset(0);
    dragDeltaRef.current = 0;
  };

  // Touch Swipe Handlers with Direction Detection (Prevents locking page scroll)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    const touch = e.touches[0];
    dragStartXRef.current = touch.clientX;
    dragStartYRef.current = touch.clientY;
    dragDeltaRef.current = 0;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    isHorizontalSwipeRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartXRef.current;
    const deltaY = touch.clientY - dragStartYRef.current;

    // Detect primary direction on first significant movement
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // User is scrolling vertically - cancel horizontal carousel drag
          isHorizontalSwipeRef.current = false;
          isDraggingRef.current = false;
          setIsDragging(false);
          setDragOffset(0);
          return;
        } else {
          // User is swiping horizontally
          isHorizontalSwipeRef.current = true;
          setIsDragging(true);
        }
      }
    }

    if (isHorizontalSwipeRef.current === true) {
      hasDraggedRef.current = true;
      dragDeltaRef.current = deltaX;
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current && isHorizontalSwipeRef.current !== true) {
      isHorizontalSwipeRef.current = null;
      return;
    }
    isDraggingRef.current = false;
    setIsDragging(false);
    isHorizontalSwipeRef.current = null;

    const delta = dragDeltaRef.current;
    dragDeltaRef.current = 0;
    setDragOffset(0);

    const threshold = Math.min(cardWidth * 0.18, 50);
    if (delta < -threshold) {
      slideNext();
    } else if (delta > threshold) {
      slidePrev();
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || isTransitioning) return;
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - dragStartXRef.current;
      if (Math.abs(delta) > 5) {
        hasDraggedRef.current = true;
      }
      dragDeltaRef.current = delta;
      setDragOffset(delta);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      const delta = e.clientX - dragStartXRef.current;
      dragDeltaRef.current = 0;
      setDragOffset(0);

      const threshold = Math.min(cardWidth * 0.2, 60);
      if (delta < -threshold) {
        slideNext();
      } else if (delta > threshold) {
        slidePrev();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, cardWidth, slideNext, slidePrev]);

  // Prevent accidental link / button click if dragged
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDraggedRef.current = false;
    }
  };

  // Calculate track translation
  const currentTranslate = (CLONE_COUNT + currentIndex) * stepSize - dragOffset;

  return (
    <section id="services" className="py-10 sm:py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="site-container relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-accent">
                Our Services
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold tracking-tight text-gray-900 leading-tight">
              Complete Care for Your Car
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
            {/* Header Navigation Arrows */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={slidePrev}
                aria-label="Previous service"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300
                           flex items-center justify-center text-gray-700 hover:text-accent shadow-xs sm:shadow-sm
                           transition-all duration-200 active:scale-95 group/btn cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={slideNext}
                aria-label="Next service"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300
                           flex items-center justify-center text-gray-700 hover:text-accent shadow-xs sm:shadow-sm
                           transition-all duration-200 active:scale-95 group/btn cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>

            <a
              href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to enquire about your car services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-accent hover:text-accent-hover shrink-0"
            >
              <span>View All</span> <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills (Scrollable horizontally on mobile, wrapping on desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {SERVICES_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? "bg-accent text-white shadow-xs"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Outer Wrapper Aligned with Grid */}
        <div
          className="relative group/carousel w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer Left Floating Navigation Button */}
          <button
            type="button"
            onClick={slidePrev}
            aria-label="Previous service"
            className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full bg-white border border-gray-200
                       shadow-md hover:shadow-xl text-gray-700 hover:text-accent hover:border-accent
                       items-center justify-center transition-all duration-200 active:scale-95 group/btn
                       cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover/btn:-translate-x-0.5" />
          </button>

          {/* Carousel Viewport (Spans full content width) */}
          <div
            ref={containerRef}
            className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pt-2 pb-5 -mt-2 -mb-5 px-0.5"
            style={{ touchAction: "pan-y" }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClickCapture={handleClickCapture}
          >
            {/* Sliding Track */}
            <div
              className="flex"
              style={{
                gap: `${GAP_PX}px`,
                transform: `translate3d(-${currentTranslate}px, 0, 0)`,
                transition:
                  isDragging || !enableTransition
                    ? "none"
                    : "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)",
                willChange: "transform",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((service) => (
                <div
                  key={service.uniqueKey}
                  style={{
                    width: `${cardWidth}px`,
                    minWidth: `${cardWidth}px`,
                    maxWidth: `${cardWidth}px`,
                  }}
                  className="flex-shrink-0 flex flex-col"
                >
                  {/* Premium Service Card with Balanced Mobile Proportions */}
                  <div
                    className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200
                               shadow-xs sm:shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1.5
                               transition-all duration-300 ease-out flex flex-col h-full cursor-pointer"
                  >
                    {/* Card Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={service.image}
                        alt={`Track Automotive - ${service.title}`}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out pointer-events-none"
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=900&auto=format&fit=crop";
                        }}
                      />
                      {/* Category badge */}
                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider
                                         bg-white/95 text-gray-800 backdrop-blur-sm border border-white/50 shadow-xs">
                          {service.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3.5 sm:p-5 flex-1 flex flex-col">
                      {/* Red icon accent */}
                      <div className="w-6 sm:w-8 h-0.5 bg-accent mb-2 sm:mb-3" />
                      <h3 className="text-sm sm:text-base font-heading font-semibold text-gray-900 leading-snug mb-1.5 sm:mb-2 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-2 sm:line-clamp-none">
                        {service.shortDescription}
                      </p>

                      {/* Action row */}
                      <div className="flex items-center gap-2 pt-2.5 sm:pt-3 border-t border-gray-100 mt-auto">
                        <a
                          href={getServiceWhatsAppUrl(service.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 rounded-lg
                                     bg-accent hover:bg-accent-hover text-white text-[11px] sm:text-xs font-semibold
                                     shadow-xs sm:shadow-sm hover:shadow-md hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95
                                     transition-all duration-200"
                        >
                          <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span>Inquire</span>
                        </a>
                        <a
                          href={getPhoneCallUrl()}
                          className="p-2 sm:p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-accent
                                     border border-gray-200/80 transition-colors"
                          aria-label={`Call about ${service.title}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <div className="hidden sm:block p-2.5 rounded-lg bg-gray-50 text-gray-400 border border-gray-100 cursor-default">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outer Right Floating Navigation Button */}
          <button
            type="button"
            onClick={slideNext}
            aria-label="Next service"
            className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full bg-white border border-gray-200
                       shadow-md hover:shadow-xl text-gray-700 hover:text-accent hover:border-accent
                       items-center justify-center transition-all duration-200 active:scale-95 group/btn
                       cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        </div>

        {/* Pagination Indicators / Dots (Responsive Capped or Scaled) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-8">
          {filteredServices.map((service, idx) => {
            const activeDot =
              ((currentIndex % filteredServices.length) + filteredServices.length) %
              filteredServices.length;
            const isSelected = activeDot === idx;
            return (
              <button
                key={`dot-${service.id}-${idx}`}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${service.title}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  isSelected
                    ? "w-5 sm:w-8 bg-accent"
                    : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
