import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import DonationSection from "@/components/home/DonationSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EventsPreview from "@/components/home/EventsPreview";
import LiveDarshanCTA from "@/components/home/LiveDarshanCTA";
import TransparencySection from "@/components/home/TransparencySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesSection />
      <StatsSection />
      <LiveDarshanCTA />
      <DonationSection />
      <TransparencySection />
      <EventsPreview />
      <TestimonialsSection />
    </>
  );
}
