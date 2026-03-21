import React from 'react';
import { motion } from 'framer-motion';
import { HeroParticles } from './HeroParticles';

export function Hero() {
  return (
    <section
      id="hero"
      style={{ backgroundColor: '#050505' }}
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden pt-32 pb-20"
    >
      {/* Background - bg-fixed so the image stays still while content scrolls */}
      {/* The HeroParticles canvas sizes itself to THIS section via getBoundingClientRect */}
      {/* so the flare point stays anchored to the image even while scrolling */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-[75%_5%] md:bg-[left_center] bg-fixed bg-[length:768px_512px] md:bg-[length:1125px_auto]"
        style={{
          backgroundImage: `url('https://i.postimg.cc/fTr2CQYp/hero_bg.jpg')`
        }}
      >
        {/* ILUMINAÇÃO CINEMATOGRÁFICA */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div
            className="absolute inset-0 mix-blend-color-dodge opacity-40"
            style={{
              background: 'radial-gradient(circle at 30% 45%, rgba(232, 39, 42, 0.3) 0%, transparent 60%)'
            }}
          />
        </div>
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-[0%] right-[-10%] w-[50vw] h-[50vw] glow-red-orbit pointer-events-none z-10 opacity-5" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] glow-red-orbit pointer-events-none z-10 opacity-[0.02]" />

      {/* Single particle system — no HeroAmbientEffect needed */}
      <HeroParticles />

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 max-w-7xl flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center w-full mt-10 md:mt-0"
        >
          <div className="flex flex-col space-y-5 lg:space-y-8 max-w-2xl">
            <div className="w-16 h-px bg-[#E8272A]/50" />
            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-display font-medium tracking-tighter leading-[1.05] text-white drop-shadow-xl">
              FUSÃO<br />NEURO + IA
            </h1>
            <div className="space-y-3 md:space-y-4">
              <p className="text-base md:text-xl font-light text-gray-300 drop-shadow-md">
                Onde processos repetitivos encontram inteligência estruturada.
              </p>
              <p className="text-sm md:text-lg font-light text-gray-300 drop-shadow-md">
                Fusão estratégica entre{' '}
                <span className="text-white font-medium">Neurociência</span>,{' '}
                <span className="text-white font-medium">IA Generativa</span> e{' '}
                <span className="text-white font-medium">Ciência da Criatividade</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
