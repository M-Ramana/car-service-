import React, { useRef, useEffect, useState } from "react";
import { Calendar, Car, Clock, ThumbsUp, ChevronDown } from "lucide-react";
import { getWhatsAppUrl } from "../data/business";

const STATS = [
  { icon: <Car className="w-5 h-5 text-accent" />, value: "2,500+", label: "Cars Detailed" },
  { icon: <Clock className="w-5 h-5 text-accent" />, value: "5+", label: "Years Experience" },
  { icon: <ThumbsUp className="w-5 h-5 text-accent" />, value: "1,000+", label: "Happy Customers" },
];

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasNavigatedAwayRef = useRef<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Trigger subtle text entrance animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Play video safely respecting browser autoplay restrictions & motion preferences
  const safePlayVideo = (resetToStart = false) => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced-motion accessibility preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    if (resetToStart) {
      try {
        video.currentTime = 0;
      } catch (err) {
        // Ignore seek error if metadata not yet loaded
      }
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Gracefully handle browser autoplay policies
        console.debug("Video autoplay handled:", err);
      });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Start playback once on initial mount
    safePlayVideo(true);

    // IntersectionObserver to detect when user leaves and returns to the hero section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User returned to the homepage hero
            if (hasNavigatedAwayRef.current) {
              hasNavigatedAwayRef.current = false;
              safePlayVideo(true);
            }
          } else {
            // User navigated / scrolled away past the homepage hero
            hasNavigatedAwayRef.current = true;
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    // Also listen to hash changes for #home or navigation clicks
    const handleHashChange = () => {
      if (window.location.hash === "#home" || window.location.hash === "") {
        if (hasNavigatedAwayRef.current) {
          hasNavigatedAwayRef.current = false;
          safePlayVideo(true);
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const scrollDown = () => {
    const el = document.getElementById("services");
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex items-center bg-[#0d0d0d] overflow-hidden"
    >
      {/* ── Background Automotive Motion Video Layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src="/videos/hero-background.mp4"
          autoPlay
          muted
          playsInline
          loop={false}
          preload="auto"
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />

        {/* Subtle cinematic gradient overlays: darkens left side for text legibility while keeping the video bright & prominent across center/right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:to-transparent w-full lg:w-4/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* ── Hero Content Container ── */}
      <div className="relative z-10 site-container pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 w-full">
        <div
          className={`max-w-2xl lg:max-w-3xl transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {/* Section eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 mb-5 sm:mb-6">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white/90">
              Premium Car Care
            </span>
          </div>

          {/* Main headline with fluid clamp() sizing */}
          <h1
            className="font-heading font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(2rem, 5.8vw, 4rem)" }}
          >
            Detailing<br />
            That Brings<br />
            <span className="text-accent">Your Car Back</span> to Life.
          </h1>

          {/* Tagline / Description */}
          <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] max-w-xl font-normal">
            Professional car detailing, ceramic coating, paint protection
            and more — for a cleaner, shinier, longer-lasting drive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 mb-10 sm:mb-12 w-full sm:w-auto">
            <a
              href={getWhatsAppUrl("Hello TRACK AUTOMOTIVE, I would like to book an appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg
                         bg-accent hover:bg-accent-hover text-white font-semibold text-sm sm:text-base
                         shadow-lg hover:shadow-red-600/30 transition-all duration-200 w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg
                         bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base
                         border border-white/25 backdrop-blur-md hover:border-white/45
                         transition-all duration-200 w-full sm:w-auto"
            >
              <span>Explore Services</span>
            </a>
          </div>

          {/* Business Statistics Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:flex-wrap items-center gap-4 sm:gap-8 lg:gap-10 pt-6 sm:pt-8 border-t border-white/15 max-w-2xl">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/50 border border-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-heading font-bold text-white leading-none drop-shadow-sm">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-300 mt-1 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-gray-300 hover:text-accent transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};
