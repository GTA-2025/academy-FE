"use client";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import CoursesSection from "@/components/landing/courses-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import CTASection from "@/components/landing/cta-ection";
import AcademyFeaturesSection from "@/components/landing/academy-features-section";
import DashboardSection from "@/components/landing/dashboard-section";
import Footer from "@/components/landing/footer";

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
