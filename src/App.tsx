import React from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { GallerySection } from "./components/GallerySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactCTA } from "./components/ContactCTA";
import { Footer } from "./components/Footer";
import { FloatingContactButtons } from "./components/FloatingContactButtons";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-accent selection:text-white overflow-x-hidden w-full relative">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow w-full overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Brand Narrative & Values */}
        <AboutSection />

        {/* Automotive Services Catalog */}
        <ServicesSection />

        {/* Why Choose Us 4 Pillars */}
        <WhyChooseUs />

        {/* Automotive Work Showcase Gallery */}
        <GallerySection />

        {/* Customer Testimonials & Reviews */}
        <TestimonialsSection />

        {/* High-Impact Contact CTA Banner */}
        <ContactCTA />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Fixed Bottom-Right Contact Buttons */}
      <FloatingContactButtons />
    </div>
  );
};

export default App;
