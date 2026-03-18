/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WebGLVortexAnel } from './components/WebGLVortexAnel';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { MethodAndMentorSection } from './components/MethodAndMentorSection';
import { DiagnosticSection } from './components/DiagnosticSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { BackgroundGrid } from './components/BackgroundGrid';

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#E8272A] selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Preloader />
      <BackgroundGrid />
      <WebGLVortexAnel />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ProblemSection />
        <MethodAndMentorSection />
        <DiagnosticSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
