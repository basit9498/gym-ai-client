'use client';

import dynamic from 'next/dynamic';
import {
  Navbar,
  HeroSection,
  TrustedBy,
  FeaturesSection,
  InteractiveDemo,
  HowItWorks,
  ProgressSection,
  Testimonials,
  PricingSection,
  FAQSection,
  FinalCTA,
  Footer,
} from '@/modules/marketing';

const ParticlesBackground = dynamic(
  () => import('@/modules/marketing/components/ParticlesBackground'),
  { ssr: false }
);
const CursorGlow = dynamic(
  () => import('@/modules/marketing/components/CursorGlow'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden " style={{ background: '#03030f' }}>
      <ParticlesBackground />
      <CursorGlow />

      <Navbar />

      <HeroSection />
      <TrustedBy />
      <FeaturesSection />
      <InteractiveDemo />
      <HowItWorks />
      <ProgressSection />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
