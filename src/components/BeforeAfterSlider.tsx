import React, { useState, useRef, useCallback, useEffect } from "react";
import { MoveHorizontal, Sparkles } from "lucide-react";
import { BeforeAfterItem } from "../data/gallery";
import { getWhatsAppUrl } from "../data/business";

interface BeforeAfterSliderProps {
  item: BeforeAfterItem;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("touchend", handleGlobalMouseUp);
      window.addEventListener("touchmove", handleGlobalTouchMove);
    }

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Interactive Transformation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-gray-900">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {item.subtitle}
          </p>
        </div>

        <a
          href={getWhatsAppUrl(`Hello TRACK AUTOMOTIVE, I was impressed by your Before & After paint correction showcase (${item.vehicle}). Could you quote me for similar work?`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-sm transition-all shrink-0"
        >
          <span>Get Similar Results</span>
        </a>
      </div>

      {/* Slider Visual Frame */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        className="relative h-[340px] sm:h-[450px] rounded-xl overflow-hidden cursor-ew-resize select-none border border-gray-200 shadow-inner group"
      >
        {/* "After" Image (Full background) */}
        <img
          src={item.afterImage}
          alt={item.afterLabel}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop";
          }}
        />

        {/* "Before" Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={item.beforeImage}
            alt={item.beforeLabel}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none max-w-none filter brightness-90"
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%",
              height: "100%",
            }}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop";
            }}
          />
        </div>

        {/* Before / After Badges */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <span className="px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-black/85 text-silver-light backdrop-blur-md border border-[#333333]">
            {item.beforeLabel}
          </span>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none z-10">
          <span className="px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-accent text-white backdrop-blur-md shadow-racing-sm">
            {item.afterLabel}
          </span>
        </div>

        {/* Divider Line & Red Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent border-2 border-white shadow-racing-glow flex items-center justify-center text-white">
            <MoveHorizontal className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Helper Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#333333] pointer-events-none text-[11px] text-silver-light uppercase tracking-widest font-mono">
          Drag slider left & right to compare
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2">
        <p className="text-gray-600">
          <strong className="text-gray-800">Vehicle:</strong> {item.vehicle} • {item.description}
        </p>
        <span className="text-gray-400 italic shrink-0">
          Verified Workshop Detail
        </span>
      </div>
    </div>
  );
};
