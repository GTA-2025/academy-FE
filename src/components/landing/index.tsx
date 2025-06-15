"use client";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CoursesSection from "@/components/landing/CoursesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import AcademyFeaturesSection from "@/components/landing/AcademyFeaturesSection";
import DashboardSection from "@/components/landing/DashboardSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="flex flex-col gap-20">
      <HeroSection />
      <FeaturesSection />
      <DashboardSection />
      <AcademyFeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
