import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { MagneticButton } from './MagneticButton';

export function CTASection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize coordinates from -1 to 1 instead of pixel values for smoother mapping
    setMousePos({
      x: (e.clientX - rect.left) / rect.width * 2 - 1,
      y: (e.clientY - rect.top) / rect.height * 2 - 1
    });
  };

  return (
    <section id="cta" className="relative w-full overflow-hidden border-t border-b border-white/10 bg-[#E8272A] min-h-[80vh] flex items-center justify-center" onMouseMove={handleMouseMove} style={{ perspective: "1000px" }}>
      {/* 3D Typography Composition Background */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden flex items-center justify-center" aria-hidden="true" style={{ transformStyle: "preserve-3d" }}>
        {/* Layer 1: Deepest back */}
        <motion.div animate={{ x: mousePos.x * -100, y: mousePos.y * -100 }} transition={{ type: "spring", stiffness: 50, damping: 30 }} className="absolute whitespace-nowrap opacity-[0.03] text-[15rem] md:text-[25rem] font-display font-black tracking-tighter text-black mix-blend-overlay" style={{ transform: "translateZ(-500px) rotate(-5deg)" }}>
          AUTOMAÇÃO ESCALA PRECISÃO
        </motion.div>
        {/* Layer 2: Mid-ground text */}
        <motion.div animate={{ x: mousePos.x * 50, y: mousePos.y * 50 }} transition={{ type: "spring", stiffness: 70, damping: 25 }} className="absolute whitespace-nowrap opacity-[0.05] text-[10rem] md:text-[18rem] font-display font-black tracking-tighter text-white mix-blend-overlay" style={{ transform: "translateZ(-200px) rotate(3deg)" }}>
          ZERO ALUCINAÇÕES
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <FadeIn>
          <motion.div animate={{ x: mousePos.x * 20, y: mousePos.y * 20, rotateX: mousePos.y * -10, rotateY: mousePos.x * 10 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} style={{ transformStyle: "preserve-3d" }}>
            <h2 className="text-6xl md:text-[8rem] font-medium font-display tracking-tighter leading-[0.9] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style={{ transform: "translateZ(100px)" }}>
              Eleve o Pulso
            </h2>
            <h2 className="text-6xl md:text-[8rem] font-medium font-display tracking-tighter leading-[0.9] text-black drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]" style={{ transform: "translateZ(60px)" }}>
              Tecnológico.
            </h2>
          </motion.div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl mx-auto mt-12 mb-16 leading-relaxed drop-shadow-md">
            Pronto para transformar sua operação com automação estruturada e precisão neuro-simulada?
          </p>
        </FadeIn>

        <FadeIn delay={0.3} className="flex flex-col items-center justify-center">
          <MagneticButton href="https://wa.me/5522998586180" target="_blank" rel="noreferrer" className="relative group overflow-hidden bg-black text-white px-12 py-6 rounded-full font-semibold tracking-widest text-sm uppercase shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 transition-all hover:scale-105 hover:shadow-[0_0_80px_rgba(0,0,0,0.8)]">
            <span className="relative z-10 flex items-center gap-4">
              FALAR COMIGO
              <motion.div animate={{ x: [0, 5, 0], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}><ArrowUpRight className="w-5 h-5" /></motion.div>
            </span>
            <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] z-0" />
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-4 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 tracking-widest text-sm uppercase font-semibold">
              FALAR COMIGO <ArrowUpRight className="w-5 h-5" />
            </span>
          </MagneticButton>
          <div className="flex items-center gap-2 mt-8 text-black/60 font-medium text-xs tracking-widest uppercase bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-black/5"><Lock className="w-3 h-3" /><span>Canal Seguro · Direto via WhatsApp</span></div>
        </FadeIn>
      </div>
    </section>
  );
}
