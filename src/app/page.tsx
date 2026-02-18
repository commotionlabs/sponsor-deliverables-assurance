'use client'

import {
  Header,
  HeroSection,
  StatsSection,
  TestimonialCarousel,
  FeaturesSection,
  CTASection,
  Footer
} from '@/components/landing'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StatsSection />
      <TestimonialCarousel />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  )
}