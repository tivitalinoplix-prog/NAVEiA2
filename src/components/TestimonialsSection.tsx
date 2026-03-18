import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { TiltCard } from './TiltCard';

export function TestimonialsSection() {
  const testimonials = [
    { quote: "A automação de documentos reduziu em 70% o tempo da minha equipe jurídica. O Vitalino entregou precisão absoluta.", name: "Ricardo Costa", role: "Dir. Operações", initials: "RC" },
    { quote: "Nossos processos internos eram um caos. Com a IA aplicada pelo Vitalino, ganhamos previsibilidade e escala em 30 dias.", name: "Fernanda Lima", role: "CEO Startup", initials: "FL" },
    { quote: "O alinhamento de IA que o Vitalino implementou eliminou 100% das alucinações nos nossos relatórios automáticos. Impressionante.", name: "Marcelo Andrade", role: "Gerente TI", initials: "MA" }
  ];
  return (
    <section className="py-24 md:py-32 border-t border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn className="mb-16 md:mb-24 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-white/10 mb-8"><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Star className="w-4 h-4 text-[#E8272A]" /></motion.div><span className="text-xs font-medium tracking-wide text-white uppercase">Client Stories</span></div>
          <h2 className="text-4xl lg:text-5xl font-medium font-display tracking-tighter text-white leading-tight">Resultados Reais</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}><TiltCard><article className="p-8 md:p-12 border border-white/10 bg-[#111111] hover:border-[#FF2D30] transition-all duration-300 h-full flex flex-col group relative overflow-hidden rounded-2xl"><div className="absolute inset-0 bg-gradient-to-br from-[#E8272A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /><div className="relative z-10 flex flex-col h-full"><div className="flex gap-1 mb-8 text-[#E8272A]">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div><p className="text-white text-lg font-light mb-8 leading-relaxed">"{t.quote}"</p><div className="flex items-center gap-4 mt-auto"><div className="w-12 h-12 bg-black/20 border border-white/10 rounded-full flex items-center justify-center text-sm font-medium text-[#E8272A]">{t.initials}</div><div><span className="block text-white font-medium">{t.name}</span><span className="text-xs text-white tracking-wider uppercase mt-1 block">{t.role}</span></div></div></div></article></TiltCard></FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
