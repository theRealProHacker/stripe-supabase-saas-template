import React from 'react';
import { Hero } from '@/src/components/landing/hero';
import { Features } from '@/src/components/landing/features';
import { Pricing } from '@/src/components/landing/pricing';
import { Footer } from '@/src/components/landing/footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}