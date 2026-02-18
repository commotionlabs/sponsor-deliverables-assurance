'use client'

import {
  Header,
  HeroSection,
  StatsSection,
  TestimonialCarousel,
  FeaturesSection,
  ProofSection,
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
      <ProofSection />
      <CTASection />
      <Footer />
    </div>
  )
}